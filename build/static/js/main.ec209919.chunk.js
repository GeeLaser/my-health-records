(this["webpackJsonpreact-upload-download-files"]=this["webpackJsonpreact-upload-download-files"]||[]).push([[0],{38:function(e,t,a){e.exports=a(73)},63:function(e,t,a){},72:function(e,t,a){},73:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(31),c=a.n(l),o=a(15),s=a(6),i=a(7),u=a.n(i),p=a(13),m=a(16),d=a(32),f=a(8),v=a(37),E=a(14),b=a.n(E),h=a(76),g=a(75),w=a(34),j=a(77),O="http://localhost:3030";a(63);function y(e){return x.apply(this,arguments)}function x(){return(x=Object(p.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("http://localhost:3030/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function N(e){var t=e.setToken,a=Object(n.useState)(),l=Object(f.a)(a,2),c=l[0],o=l[1],s=Object(n.useState)(),i=Object(f.a)(s,2),m=i[0],d=i[1],v=function(){var e=Object(p.a)(u.a.mark((function e(a){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),e.next=3,y({username:c,password:m});case 3:n=e.sent,t(n);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"login-wrapper"},r.a.createElement("h1",null,"Please Log In"),r.a.createElement("form",{onSubmit:v},r.a.createElement("label",null,r.a.createElement("p",null,"Username"),r.a.createElement("input",{type:"text",onChange:function(e){return o(e.target.value)}})),r.a.createElement("label",null,r.a.createElement("p",null,"Password"),r.a.createElement("input",{type:"password",onChange:function(e){return d(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Submit"))))}var k=function(e){var t=Object(n.useState)(null),a=Object(f.a)(t,2),l=a[0],c=a[1],o=Object(n.useState)(""),s=Object(f.a)(o,2),i=s[0],E=s[1],y=Object(n.useState)({title:"",description:""}),x=Object(f.a)(y,2),k=x[0],S=x[1],D=Object(n.useState)(""),C=Object(f.a)(D,2),P=C[0],T=C[1],F=Object(n.useState)(!1),I=Object(f.a)(F,2),R=I[0],L=I[1],A=Object(n.useRef)(),J=Object(n.useState)(),U=Object(f.a)(J,2),_=U[0],G=U[1];if(!_)return r.a.createElement(N,{setToken:G});var M=function(e){S(Object(d.a)({},k,Object(m.a)({},e.target.name,e.target.value)))},z=function(e){"over"===e?A.current.style.border="2px solid #000":"leave"===e&&(A.current.style.border="2px dashed #e9ebeb")},B=function(){var t=Object(p.a)(u.a.mark((function t(a){var n,r,c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),t.prev=1,n=k.title,r=k.description,""===n.trim()||""===r.trim()){t.next=18;break}if(!l){t.next=15;break}return(c=new FormData).append("file",l),c.append("title",n),c.append("description",r),T(""),t.next=12,b.a.post("".concat(O,"/upload"),c,{headers:{"Content-Type":"multipart/form-data"}});case 12:e.history.push("/list"),t.next=16;break;case 15:T("Please select a file to add.");case 16:t.next=19;break;case 18:T("Please enter all the field values.");case 19:t.next=24;break;case 21:t.prev=21,t.t0=t.catch(1),t.t0.response&&T(t.t0.response.data);case 24:case"end":return t.stop()}}),t,null,[[1,21]])})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{className:"search-form",onSubmit:B},P&&r.a.createElement("p",{className:"errorMsg"},P),r.a.createElement(g.a,null,r.a.createElement(w.a,null,r.a.createElement(h.a.Group,{controlId:"title"},r.a.createElement(h.a.Control,{type:"text",name:"title",value:k.title||"",placeholder:"Enter title",onChange:M})))),r.a.createElement(g.a,null,r.a.createElement(w.a,null,r.a.createElement(h.a.Group,{controlId:"description"},r.a.createElement(h.a.Control,{type:"text",name:"description",value:k.description||"",placeholder:"Enter description",onChange:M})))),r.a.createElement("div",{className:"upload-section"},r.a.createElement(v.a,{onDrop:function(e){var t=Object(f.a)(e,1)[0];c(t);var a=new FileReader;a.onload=function(){E(a.result)},a.readAsDataURL(t),L(t.name.match(/\.(jpeg|jpg|png)$/)),A.current.style.border="2px dashed #e9ebeb"},onDragEnter:function(){return z("over")},onDragLeave:function(){return z("leave")}},(function(e){var t=e.getRootProps,a=e.getInputProps;return r.a.createElement("div",Object.assign({},t({className:"drop-zone"}),{ref:A}),r.a.createElement("input",a()),r.a.createElement("p",null,"Drag and drop a file OR click here to select a file"),l&&r.a.createElement("div",null,r.a.createElement("strong",null,"Selected file:")," ",l.name))})),i?R?r.a.createElement("div",{className:"image-preview"},r.a.createElement("img",{className:"preview-image",src:i,alt:"Preview"})):r.a.createElement("div",{className:"preview-message"},r.a.createElement("p",null,"No preview available for this file")):r.a.createElement("div",{className:"preview-message"},r.a.createElement("p",null,"Image preview will be shown here after selection"))),r.a.createElement(j.a,{variant:"primary",type:"submit"},"Submit")))},S=function(){return r.a.createElement("div",{className:"header"},r.a.createElement("h1",null,"File Upload And Download"),r.a.createElement("nav",null,r.a.createElement(o.b,{activeClassName:"active",to:"/",exact:!0},"Home"),r.a.createElement(o.b,{activeClassName:"active",to:"/list"},"Files List")))},D=a(36),C=a.n(D),P=function(){var e=Object(n.useState)([]),t=Object(f.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(""),o=Object(f.a)(c,2),s=o[0],i=o[1];Object(n.useEffect)((function(){(function(){var e=Object(p.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.a.get("".concat(O,"/getAllFiles"));case 3:t=e.sent,a=t.data,i(""),l(a),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),e.t0.response&&i(e.t0.response.data);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}})()()}),[]);var m=function(){var e=Object(p.a)(u.a.mark((function e(t,a,n){var r,l,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.a.get("".concat(O,"/download/").concat(t),{responseType:"blob"});case 3:return r=e.sent,l=a.split("/"),c=l[l.length-1],i(""),e.abrupt("return",C()(r.data,c,n));case 10:e.prev=10,e.t0=e.catch(0),e.t0.response&&400===e.t0.response.status&&i("Error while downloading file. Try again later");case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,a,n){return e.apply(this,arguments)}}(),d=function(){var e=Object(p.a)(u.a.mark((function e(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.a.delete("".concat(O,"/delete/").concat(t)).then((function(e){"error"===e.status?console.log("err"):b.a.get("".concat(O,"/files"))}));case 3:a=e.sent,console.log(a.data),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"files-container"},s&&r.a.createElement("p",{className:"errorMsg"},s),r.a.createElement("table",{className:"files-table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Title"),r.a.createElement("th",null,"Description"),r.a.createElement("th",null,"Download File"))),r.a.createElement("tbody",null,a.length>0?a.map((function(e){var t=e._id,a=e.title,n=e.description,l=e.file_path,c=e.file_mimetype;return r.a.createElement("tr",{key:t},r.a.createElement("td",{className:"file-title"},a),r.a.createElement("td",{className:"file-description"},n),r.a.createElement("td",null,r.a.createElement("a",{href:"#/",onClick:function(){return m(t,l,c)}},"Download /"),r.a.createElement("a",{href:"#/",onClick:function(){return d(t)}},"Delete")))})):r.a.createElement("tr",null,r.a.createElement("td",{colSpan:3,style:{fontWeight:"300"}},"No files found. Please add some.")))))},T=function(){return r.a.createElement(o.a,null,r.a.createElement("div",{className:"container"},r.a.createElement(S,null),r.a.createElement("div",{className:"main-content"},r.a.createElement(s.c,null,r.a.createElement(s.a,{component:k,path:"/",exact:!0}),r.a.createElement(s.a,{component:P,path:"/list"})))))};a(71),a(72);c.a.render(r.a.createElement(T,null),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.ec209919.chunk.js.map