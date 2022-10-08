import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyLoad from 'vue-lazyload'

import "assets/icon/iconfont.css"

import 'vant/lib/index.css';
import 'vant/lib/index.less';

import {
    Tabbar,
    TabbarItem,
    Tab,
    Tabs,
    Icon,
    Button,
    NavBar,
    Swipe,
    SwipeItem,
    Tag,
    PullRefresh,
    Toast,
    Sticky,
    Grid,
    GridItem,
    Divider,
    Lazyload,
    Image as VanImage,
    List,
    Cell,
    CellGroup,
    Collapse,
    CollapseItem,
    ActionSheet,
    Search,
    Form,
    Field,
    Popup,
    Area,
    Calendar,
    RadioGroup,
    Radio,
    // Progress,
    Circle,
    Slider,
    Empty,
} from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tag);
Vue.use(PullRefresh);
Vue.use(Toast);
Vue.use(Sticky);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Divider);
Vue.use(Lazyload);
Vue.use(VanImage);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(ActionSheet);
Vue.use(Search);
Vue.use(Form);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Area);
Vue.use(Calendar);
Vue.use(RadioGroup);
Vue.use(Radio);
// Vue.use(Progress);
Vue.use(Circle);
Vue.use(Slider);
Vue.use(Empty);

Vue.use(VueLazyLoad, {
    loading: require('./assets/img/common/placeholder.png')
});


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
    data: {
        bus: new Vue()
    }
}).$mount('#app')
