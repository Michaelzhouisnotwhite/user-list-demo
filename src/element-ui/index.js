import { Table, TableColumn } from "element-ui";
import { Dialog } from "element-ui";
import { Button } from "element-ui";
import { Form, FormItem } from "element-ui";
import { Input, InputNumber } from "element-ui";
import { Message, MessageBox } from "element-ui";
import { Card } from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css'
// import ElementUI from "element-ui";
import Vue from "vue";


// Vue.use(Message)
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Card);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
