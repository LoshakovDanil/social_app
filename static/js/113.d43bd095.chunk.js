"use strict";(self.webpackChunkreact_app=self.webpackChunkreact_app||[]).push([[113],{5113:function(e,r,i){i.r(r),i.d(r,{default:function(){return l}});var a=i(5705),n=i(7689),t=i(2539),s=i(8094),c=i(7511),o="Login_error__ByltQ",d=i(184),l=function(){var e=(0,t.C)((function(e){return e.auth.isAuth})),r=(0,t.C)((function(e){return e.auth.error})),i=(0,t.C)((function(e){return e.auth.errorType})),l=(0,t.C)((function(e){return e.auth.captcha})),u=(0,t.T)();if(e)return(0,d.jsx)(n.Fg,{to:"/profile"});return(0,d.jsx)("div",{children:(0,d.jsx)(a.J9,{enableReinitialize:!0,initialValues:{login:"",password:"",captcha:""},onSubmit:function(e,r){var i=r.setSubmitting,a=r.resetForm;u((0,c.x4)({email:e.login,password:e.password,rememberMe:!1,captcha:null===e||void 0===e?void 0:e.captcha})),i(!1),a()},validate:function(e){var r={};return e.login||(r.login="You need to type correct email"),e.password||(r.password="You need to type password"),e.captcha||10!==i||(r.captcha="Captcha is required"),r},children:function(e){var i=e.errors,n=e.touched,t=e.isSubmitting;return(0,d.jsxs)(a.l0,{children:[(0,d.jsx)("div",{children:(0,d.jsx)(a.gN,{type:"text",name:"login"})}),i.login&&n.login&&(0,d.jsx)("div",{className:o,children:i.login}),(0,d.jsx)("div",{children:(0,d.jsx)(a.gN,{type:"password",name:"password"})}),i.password&&n.password&&(0,d.jsx)("div",{className:o,children:i.password}),l&&(0,d.jsx)("img",{src:l,alt:"Server is not working"}),l&&(0,d.jsx)("div",{children:(0,d.jsx)(a.gN,{type:"input",name:"captcha"})}),(0,d.jsx)("div",{children:(0,d.jsx)(s.z,{disabled:t,type:"submit",children:"Login"})}),i.captcha&&(0,d.jsx)("div",{className:o,children:i.captcha}),(0,d.jsxs)("div",{className:o,children:[" ",r," "]})]})}})})}}}]);
//# sourceMappingURL=113.d43bd095.chunk.js.map