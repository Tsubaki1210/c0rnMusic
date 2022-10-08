import { mapState } from "vuex";
import { areaList } from "@vant/area-data";

export const baseInfoMixin = {
    computed: {
        ...mapState(["userDetail"]),
    },
    data() {
        return {
            //用户详情信息
            userdetails: this.$store.state.userDetail,
            //用户昵称
            nickname: "",
            //省市区数据
            areaList,
            //用户创建时长
            years: "",
            //用户创建时间
            times: "",
            //用户性别
            gender: "",
            //用户生日
            // birthday: "未设置",
            birthday: "",
            //用户所在地区省份
            province: "",
            //用户简介
            briefIntroduction: "",

        }
    },
    created() {
        //用户昵称
        this.nickname = this.userdetails.profile.nickname;
        //用户创建时长
        this.years = parseInt(this.userdetails.createDays / 365);
        //用户性别判断
        if (this.userdetails.profile.gender === 0) {
            this.gender = "未设置";
        } else if (this.userdetails.profile.gender === 1) {
            this.gender = "男";
        } else if (this.userdetails.profile.gender === 2) {
            this.gender = "女";
        }
        //用户生日
        if (this.userdetails.profile.birthday === -2209017600000) {
            this.birthday = "未设置"
            // this.birthday = this.userdetails.profile.birthday;
        }
        else {
            this.birthday = this.userdetails.profile.birthday;
        }

        //用户所在地区省份
        const provinceCode = this.userdetails.profile.province;
        const cityCode = this.userdetails.profile.city;
        console.log(this.areaList)
        if (
            //直辖市判断
            provinceCode == "110000" ||
            provinceCode == "120000" ||
            provinceCode == "310000" ||
            provinceCode == "500000"
        ) {
            this.province = "直辖市" + " " + this.areaList.province_list[provinceCode];
        } else if (
            //使自治区和特别行政区截取前两位
            provinceCode == "450000" ||
            provinceCode == "540000" ||
            provinceCode == "640000" ||
            provinceCode == "650000" ||
            provinceCode == "810000" ||
            provinceCode == "820000"
        ) {
            this.province = this.areaList.province_list[provinceCode].substring(0, 2) + " " + this.areaList.city_list[cityCode];
        } else {
            this.province = this.areaList.province_list[provinceCode] + " " + this.areaList.city_list[cityCode];
        }

        //用户简介
        if (this.userdetails.profile.signature === "") {
            this.briefIntroduction = "还没有简介"
        } else {
            this.briefIntroduction = this.userdetails.profile.signature;
        }

    },
}