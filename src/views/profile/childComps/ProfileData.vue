<template>
  <div>
    <nav-bar class="profile-data-navbar">
      <template #left>
        <van-icon name="arrow-left" @click="profiledataback" />
      </template>
      <template #title>
        <span class="title">我的资料</span>
      </template>
    </nav-bar>
    <div class="cell-block1">
      <div class="cell-first">
        <h5-cropper id="cropper" :option="option" @getFile="getFile">
        </h5-cropper>
        <span class="cell-left-text">头像</span>
        <img id="avatar" :src="this.avatarUrl" alt="" />
      </div>
      <div class="cell" @click="shownickname">
        <span class="cell-left-text">昵称</span>
        <span class="cell-right-text">{{ this.nickname }}</span>
      </div>
      <van-dialog
        v-model="showname"
        title="修改昵称"
        show-cancel-button
        @confirm="nameConfirm"
        confirmButtonText="保存"
      >
        <van-field
          class="field-nickname"
          v-model="username"
          label="昵称"
          placeholder="请输入昵称"
        />
      </van-dialog>
      <div class="cell" @click="showgender">
        <span class="cell-left-text">性别</span>
        <span class="cell-right-text">{{ this.gender }}</span>
      </div>
      <van-dialog
        v-model="showsex"
        show-cancel-button
        @confirm="genderConfirm"
        @cancel="genderCancel"
        confirmButtonText="保存"
      >
        <van-radio-group v-model="radio" class="gender-group">
          <van-cell-group :border="false">
            <van-cell title="男" clickable :border="false" @click="radio = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell title="女" clickable :border="false" @click="radio = '2'">
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-dialog>
    </div>
    <div class="cell-block2">
      <div class="cell-first" @click="showbirthday = true">
        <span class="cell-left-text">生日</span>
        <span class="cell-right-text">{{ this.birthday | showDate }}</span>
      </div>
      <van-calendar
        v-model="showbirthday"
        @confirm="onConfirm"
        :min-date="minDate"
        :max-date="maxDate"
        :default-date="defaultDate"
      />
      <div class="cell" @click="showprovince">
        <span class="cell-left-text">地区</span>
        <span class="cell-right-text">{{ this.province }}</span>
      </div>
      <van-popup v-model="showPro" position="bottom" round>
        <van-area
          title="地区"
          :area-list="areaList"
          :columns-num="2"
          @confirm="proConfirm"
          @cancel="proCancel"
        />
      </van-popup>
      <!-- <div class="cell">
        <span class="cell-left-text">大学</span>
      </div>
      <div class="cell">
        <span class="cell-left-text">音乐标签</span>
      </div> -->
      <div class="cell" @click="showbriefIntroduction">
        <span class="cell-left-text">简介</span>
        <span class="cell-right-text">{{ this.briefIntroduction }}</span>
      </div>
      <van-dialog
        v-model="showIntro"
        show-cancel-button
        @confirm="briefIntro"
        @cancel="cancelBriefIntro"
        confirmButtonText="保存"
      >
        <van-field
          class="field-brieft-introduction"
          v-model="IntroMessage"
          rows="2"
          :autosize="autosize"
          label="简介"
          type="textarea"
          maxlength="150"
          placeholder="一句话介绍"
          show-word-limit
        >
          <!-- <template #button>
            <button @click="briefIntro">保存</button>
            <button @click="cancelBriefIntro">取消</button>
          </template> -->
        </van-field>
      </van-dialog>
    </div>
    <div class="save-info">
      <button @click="saveInfo" type="button" :disabled="isDisabled">
        保存
      </button>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import NavBarIcon from "components/common/navbar/NavBarIcon";
import H5Cropper from "vue-cropper-h5";

import axios from "axios";

import { mapState } from "vuex";
import { baseInfoMixin } from "common/js/mixin";
import { formatDate } from "common/js/utils";

import { Dialog } from "vant";

export default {
  name: "ProfileData",
  mixins: [baseInfoMixin],
  components: {
    NavBar,
    NavBarIcon,
    H5Cropper,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      //用户登录信息(获取用户cookie)
      loginstatus: this.$store.state.loginStatus,
      //用户cookie
      cookieToken: "",
      //用户详情信息
      userdetails: this.$store.state.userDetail,
      //存储更新后的用户详情信息
      newuserdetails: {},

      //生日日历
      showbirthday: false,
      minDate: new Date(1990, 0, 1),
      defaultDate: new Date(1990, 0, 1),
      maxDate: new Date(2022, 0, 31),

      //按钮是否禁用状态,未更改信息情况下默认true(禁用状态)
      isDisabled: true,
      //用户头像url
      avatarUrl: "",
      uploadAvatar: false,
      //cropper配置
      option: {},
      //显示昵称输入框
      showname: false,
      username: "",
      //显示性别选择框
      showsex: false,
      choicegender: "",
      radio: "",
      genderNumber: "",
      //展开地区选择
      showPro: false,
      //展开简介选择
      showIntro: false,
      //用户当前性别，与newgender对比
      oldgender: "",
      //用户修改后的性别，与oldgender对比
      newgender: "",
      //用户当前昵称，与newnickname对比
      oldnickname: "",
      //用户修改昵称，与oldnickname对比
      newnickname: "",
      //用户当前生日的时间戳，与newbirthday对比
      oldbirthday: "",
      //用户更新生日的时间戳，与oldbirthday对比
      newbirthday: "",
      //用户更新前的省份代码
      oldProvinceCode: "",
      //用户更新后的省份代码
      newProvinceCode: "",
      //用户更新前的城市代码
      oldCityCode: "",
      //用户更新后的城市代码
      newCityCode: "",
      //用户当前省份及城市，与newprovince对比
      oldprovince: "",
      //用户更新后的省份及城市，与oldprovince对比
      newprovince: "",
      //用户当前简介，与newbriefIntroduction相比
      oldbriefIntroduction: "",
      //用户更新后的简介，与oldbriefIntroduction相比
      newbriefIntroduction: "",
      //与输入框message绑定，是在简介部分
      IntroMessage: "",

      //cropper的option配置
      option: {
        autoCropWidth: 1000,
        autoCropHeight: 1000,
      },
    };
  },
  created() {
    //用户cookie
    this.cookieToken = this.loginStatus.cookie;
    //用户头像url
    this.avatarUrl = this.userdetails.profile.avatarUrl;
    //获取性别单选框的默认选择项
    //由于gender类型是number,而单选框默认选择需求要字符串形式,所以转换成字符串形式
    this.radio = this.userdetails.profile.gender.toString();
    this.genderNumber = parseInt(this.radio);
    // this.uploadGenderNumber = parseInt(this.genderNumber);
    console.log(this.$data);
    //将用户当前性别存入，用于与newgender对比
    this.oldgender = this.gender;
    //将用户当前昵称存入，用于与newnickname对比
    this.oldnickname = this.nickname;
    this.username = this.oldnickname; //修改昵称时默认显示当前用户昵称
    //将用户当前生日时间戳存入，用于与newbirthday对比
    this.oldbirthday = this.birthday;
    console.log(this.oldbirthday);
    //将用户当前省份代码存入
    this.oldProvinceCode = this.userdetails.profile.province;
    //将用户当前城市代码存入
    this.oldCityCode = this.userdetails.profile.city;
    //简介输入框的最小高度
    this.autosize = { minHeight: 300 };
    //将用户当前简介存入，用于与newbriefIntroduction对比
    //若判断(用户新输入的简介)的条件在else if中则用下面的判断方法(方法：briefIntro)
    this.oldbriefIntroduction = this.briefIntroduction;
    //判断用户签名是否为空
    //若判断(用户新输入的简介)的条件在if中则用上面的判断方法(方法：briefIntro)
    // if (this.userdetails.profile.signature === "") {
    // this.oldbriefIntroduction = "";
    // } else {
    // this.oldbriefIntroduction = this.briefIntroduction;
    // }
  },
  filters: {
    showDate(value) {
      let bir = Number(value);
      if (!isNaN(bir)) {
        const date = new Date(value);
        return formatDate(date, "yyyy-MM-dd");
      } else {
        return value;
      }
    },
  },
  computed: {
    ...mapState(["loginStatus"]),
    ...mapState(["userDetail"]),
  },
  methods: {
    profiledataback() {
      this.$router.go(-1);
    },
    //获取裁剪完成的 file 数据
    async getFile(file) {
      var formData = new FormData();
      formData.append("imgFile", file);
      const imgSize = await this.getImgSize(file);
      await axios({
        method: "post",
        url: `https://c0rn-music-api.vercel.app/avatar/upload?cookie=${this.cookieToken}&imgSize=${imgSize.width}&imgX=0&imgY=0`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then((res) => {
          if (res.data.code === 200) {
            console.log(res);
            this.avatarUrl = res.data.data.url;

            const userId = this.loginstatus.profile.userId;
            axios({
              method: "get",
              url:
                "https://c0rn-music-api.vercel.app/user/detail?uid=" + userId,
              withCredentials: true,
            }).then((res) => {
              //存入数据前先将此对象清空
              for (let key in this.newuserdetails) {
                delete this.newuserdetails[key];
              }

              this.newuserdetails = res.data;
              this.$store.dispatch("getUserDetail", this.newuserdetails);
              console.log(this.newuserdetails);
            });
          }
        })
        .catch((err) => {
          console.log(err.request);
        });
    },
    //获取用户上传图片的高宽度
    getImgSize(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (theFile) {
          let image = new Image();
          image.src = theFile.target.result;
          image.onload = function () {
            resolve({
              width: this.width,
              height: this.height,
            });
          };
        };
      });
    },
    //显示更改昵称输入框
    shownickname() {
      this.showname = true;
    },
    //用户修改昵称确认按钮
    nameConfirm() {
      this.newnickname = this.username;
      if (this.newnickname === "") {
        this.nickname = this.oldnickname;
      } else if (this.oldnickname !== this.newnickname) {
        this.isDisabled = false;
        this.nickname = this.newnickname;
      } else {
        this.nickname = this.newnickname;
        if (this.isDisabled === false) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      }
    },
    genderConfirm() {
      this.genderNumber = parseInt(this.radio);
      if (this.genderNumber === 1) {
        this.newgender = "男";
        if (this.oldgender !== this.newgender) {
          this.gender = this.newgender;
          this.isDisabled = false;
        } else {
          this.gender = this.oldgender;
          if (this.isDisabled === false) {
            this.isDisabled = false;
          } else {
            this.isDisabled = true;
          }
        }
      } else if (this.genderNumber === 2) {
        this.newgender = "女";
        if (this.oldgender !== this.newgender) {
          this.gender = this.newgender;
          this.isDisabled = false;
        } else {
          this.gender = this.oldgender;
          if (this.isDisabled === false) {
            this.isDisabled = false;
          } else {
            this.isDisabled = true;
          }
        }
      }
    },
    genderCancel() {
      this.radio = this.genderNumber.toString();
    },
    showgender() {
      this.showsex = true;
      // this.userdetails.profile.gender = "2";
    },
    //用户生日日历确认按钮
    onConfirm(date) {
      this.showbirthday = false;
      this.newbirthday = date.getTime();
      console.log(this.newbirthday);
      if (this.oldbirthday !== this.newbirthday) {
        this.isDisabled = false;
        this.birthday = this.newbirthday;
      } else {
        this.birthday = this.newbirthday;
        if (this.isDisabled === false) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      }
    },
    //呼出地区选择
    showprovince() {
      this.showPro = true;
    },
    //呼出简介输入框
    showbriefIntroduction() {
      this.showIntro = true;
    },
    //地区选择确认按钮
    proConfirm(value) {
      console.log(value);

      if (
        //直辖市判断
        value[0].code == "110000" ||
        value[0].code == "120000" ||
        value[0].code == "310000" ||
        value[0].code == "500000"
      ) {
        this.newprovince = "直辖市" + " " + value[0].name;
        this.newProvinceCode = value[0].code;
        this.newCityCode = Number(value[1].code) + Number(1);
      } else if (
        //使自治区和特别行政区截取前两位
        value[0].code == "450000" ||
        value[0].code == "540000" ||
        value[0].code == "640000" ||
        value[0].code == "650000" ||
        value[0].code == "810000" ||
        value[0].code == "820000"
      ) {
        this.newprovince = value[0].name.substring(0, 2) + " " + value[1].name;
        this.newProvinceCode = value[0].code;
        this.newCityCode = value[1].code;
      } else {
        this.newprovince = value[0].name + " " + value[1].name;
        this.newProvinceCode = value[0].code;
        this.newCityCode = value[1].code;
      }

      if (this.oldCityCode != this.newCityCode) {
        this.isDisabled = false;
        this.province = this.newprovince;
        console.log(this.newCityCode);
      } else {
        this.province = this.newprovince;
        if (this.isDisabled === false) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      }
      this.showPro = false;
    },
    //地区选择取消按钮
    proCancel() {
      this.showPro = false;
    },
    //获取用户填写的简介
    briefIntro() {
      console.log(this.IntroMessage);
      this.newbriefIntroduction = this.IntroMessage;
      if (this.newbriefIntroduction === "") {
        this.briefIntroduction = this.oldbriefIntroduction;
        if (this.isDisabled === false) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      } else if (this.oldbriefIntroduction !== this.newbriefIntroduction) {
        this.isDisabled = false;
        this.briefIntroduction = this.newbriefIntroduction;
      } else {
        this.briefIntroduction = this.newbriefIntroduction;
        console.log(this.oldbriefIntroduction);
        if (this.isDisabled === false) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      }
      this.showIntro = false;
    },
    cancelBriefIntro() {
      this.showIntro = false;
      this.IntroMessage = "";
    },
    saveInfo() {
      if (this.newbirthday === "") {
        this.newbirthday = -2209017600000;
      }
      if (this.newProvinceCode === "") {
        this.newProvinceCode = this.oldProvinceCode;
      }
      if (this.newCityCode === "") {
        this.newCityCode = this.oldCityCode;
      }
      axios({
        method: "get",
        url: `https://c0rn-music-api.vercel.app/user/update?gender=${this.genderNumber}&signature=${this.newbriefIntroduction}&nickname=${this.nickname}&birthday=${this.newbirthday}&province=${this.newProvinceCode}&city=${this.newCityCode}`,
        withCredentials: true,
      }).then((res) => {
        console.log(res);
        const userId = this.userdetails.profile.userId;
        axios({
          method: "get",
          url: "https://c0rn-music-api.vercel.app/user/detail?uid=" + userId,
          withCredentials: true,
        }).then((res) => {
          //存入数据前先将此对象清空
          for (let key in this.newuserdetails) {
            delete this.newuserdetails[key];
          }

          this.newuserdetails = res.data;
          this.$store.commit("SET_USER_DETAIL", this.newuserdetails);
          console.log(this.$store.state);

          window.location.reload();
        });
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    //设置背景色
    document
      .querySelector("body")
      .setAttribute("style", "background-color: #ebebeb");
    next();
  },
  beforeRouteLeave(to, from, next) {
    //离开时清除背景色
    document.querySelector("body").setAttribute("style", "");
    next();
  },
};
</script>

<style scoped>
#cropper {
  /* display: none; */
  height: 60px;
  position: absolute;
  z-index: 1;
}

.body {
  /* width: 100%; */
  height: 100vh;
}

.profile-data-navbar >>> .van-nav-bar__title {
  /* width: 180px; */
  margin: 0 50px;
  /* text-align: left; */
}

.title {
  color: #fff;
  float: left;
}

.cell-block1 {
  margin: 5px 0;
}

.cell-block2 {
  margin: 5px 0;
}

.cell-first {
  background-color: #fff;
  height: 60px;
}

.cell-first img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  float: right;
  margin: auto 15px;
  top: 50%;
  transform: translateY(-50%);
  position: relative;
}

.cell {
  background-color: #fff;
  /* border-bottom: 1px solid #fff; */
  height: 60px;
}

.cell:after {
  content: "";
  width: 90%;
  border-bottom: 1px solid #ebebeb;
  height: 1px;
  display: block;
  margin: 0 auto;
  padding: 0;
}

.cell-left-text {
  color: #111;
  font-size: 18px;
  float: left;
  margin: auto 15px;
  top: 50%;
  transform: translateY(-50%);
  position: relative;
}

.cell-right-text {
  color: #c5c5c5;
  font-size: 16px;
  float: right;
  margin: auto 15px;
  top: 50%;
  transform: translateY(-50%);
  position: relative;
}

.van-dialog {
  width: 90%;
}

.van-dialog >>> .van-dialog__content {
  margin: 20px auto;
}

.gender-group {
  width: 98%;
  margin: 0 auto;
}

.field-nickname >>> .van-field__label {
  text-align: center;
}

.field-nickname >>> .van-field__value {
  border-bottom: 1px solid #ebebeb;
}

.field-brieft-introduction >>> .van-field__label {
  text-align: center;
}

/* .van-field button {
  background-color: #fff;
  color: var(--color-tint);
  font-size: 12px;
  width: 50px;
  padding: 6px 8px 4px;
  border: 1px solid var(--color-tint);
  border-radius: 20px;
}

.van-field >>> .van-field__body {
  display: block;
  align-items: center;
}

.van-field >>> .van-field__button {
  margin-top: 4px;
  padding-left: 0;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
} */

.save-info {
  text-align: center;
  margin-top: 30px;
}

.save-info button {
  width: 90%;
  background-color: var(--color-tint);
  color: #fff;
  font-size: 16px;
  padding: 8px 0;
  border: 1px solid #fff;
  border-radius: 20px;
}

.save-info button:disabled {
  width: 90%;
  background-color: #e08383;
  color: #fbf0f0;
  font-size: 16px;
  padding: 8px 0;
  border-radius: 20px;
}
</style>