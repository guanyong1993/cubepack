
import {ProcessBar} from "./components/ProcessBar";

// 注册 ProcessBar 组件
ProcessBar.Register();
// 添加 ProcessBar 组件
document.body.appendChild(new ProcessBar(50));
document.body.appendChild(new ProcessBar(60));
document.body.appendChild(new ProcessBar(80));