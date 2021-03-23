import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import {
    Button, Select, Menu, MenuItem, Submenu, Dialog, Form, FormItem, Input, Cascader,
    Alert, Table, Tag, RadioGroup, RadioButton, Option, Tooltip, Tabs, TabPane, Autocomplete,
    InputNumber, Switch, TableColumn, ColorPicker, Popconfirm, Breadcrumb, BreadcrumbItem,
    Message, Loading, Checkbox, MessageBox, Dropdown, DropdownItem, DropdownMenu, Upload
} from 'element-ui';

Vue.use(Button);
Vue.use(Select);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Cascader);
Vue.use(Alert);
Vue.use(Table);
Vue.use(Tag);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Option);
Vue.use(Tooltip);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Autocomplete);
Vue.use(InputNumber);
Vue.use(Switch);
Vue.use(TableColumn);
Vue.use(ColorPicker);
Vue.use(Popconfirm);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Checkbox);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Upload);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;