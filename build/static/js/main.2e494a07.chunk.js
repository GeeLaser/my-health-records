(this["webpackJsonpreact-upload-download-files"]=this["webpackJsonpreact-upload-download-files"]||[]).push([[0],{39:function(e,t,a){e.exports=a(70)},69:function(e,t,a){},70:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(32),c=a.n(l),s=a(14),o=a(6),i=a(10),u=a.n(i),m=a(13),p=a(15),d=a(33),f=a(11),E=a(38),v=a(12),b=a.n(v),h=a(73),g=a(72),w=a(35),j=a(74),O="http://localhost:3030",x=function(e){var t=Object(n.useState)(null),a=Object(f.a)(t,2),l=a[0],c=a[1],s=Object(n.useState)(""),o=Object(f.a)(s,2),i=o[0],v=o[1],x=Object(n.useState)({title:"",description:""}),y=Object(f.a)(x,2),N=y[0],k=y[1],D=Object(n.useState)(""),S=Object(f.a)(D,2),C=S[0],F=S[1],P=Object(n.useState)(!1),I=Object(f.a)(P,2),R=I[0],T=I[1],A=Object(n.useRef)(),L=function(e){k(Object(d.a)({},N,Object(p.a)({},e.target.name,e.target.value)))},M=function(e){"over"===e?A.current.style.border="2px solid #000":"leave"===e&&(A.current.style.border="2px dashed #e9ebeb")},_=function(){var t=Object(m.a)(u.a.mark((function t(a){var n,r,c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),t.prev=1,n=N.title,r=N.description,""===n.trim()||""===r.trim()){t.next=18;break}if(!l){t.next=15;break}return(c=new FormData).append("file",l),c.append("title",n),c.append("description",r),F(""),t.next=12,b.a.post("".concat(O,"/upload"),c,{headers:{"Content-Type":"multipart/form-data"}});case 12:e.history.push("/list"),t.next=16;break;case 15:F("Please select a file to add.");case 16:t.next=19;break;case 18:F("Please enter all the field values.");case 19:t.next=24;break;case 21:t.prev=21,t.t0=t.catch(1),t.t0.response&&F(t.t0.response.data);case 24:case"end":return t.stop()}}),t,null,[[1,21]])})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{className:"search-form",onSubmit:_},C&&r.a.createElement("p",{className:"errorMsg"},C),r.a.createElement(g.a,null,r.a.createElement(w.a,null,r.a.createElement(h.a.Group,{controlId:"title"},r.a.createElement(h.a.Control,{type:"text",name:"title",value:N.title||"",placeholder:"Enter title",onChange:L})))),r.a.createElement(g.a,null,r.a.createElement(w.a,null,r.a.createElement(h.a.Group,{controlId:"description"},r.a.createElement(h.a.Control,{type:"text",name:"description",value:N.description||"",placeholder:"Enter description",onChange:L})))),r.a.createElement("div",{className:"upload-section"},r.a.createElement(E.a,{onDrop:function(e){var t=Object(f.a)(e,1)[0];c(t);var a=new FileReader;a.onload=function(){v(a.result)},a.readAsDataURL(t),T(t.name.match(/\.(jpeg|jpg|png)$/)),A.current.style.border="2px dashed #e9ebeb"},onDragEnter:function(){return M("over")},onDragLeave:function(){return M("leave")}},(function(e){var t=e.getRootProps,a=e.getInputProps;return r.a.createElement("div",Object.assign({},t({className:"drop-zone"}),{ref:A}),r.a.createElement("input",a()),r.a.createElement("p",null,"Drag and drop a file OR click here to select a file"),l&&r.a.createElement("div",null,r.a.createElement("strong",null,"Selected file:")," ",l.name))})),i?R?r.a.createElement("div",{className:"image-preview"},r.a.createElement("img",{className:"preview-image",src:i,alt:"Preview"})):r.a.createElement("div",{className:"preview-message"},r.a.createElement("p",null,"No preview available for this file")):r.a.createElement("div",{className:"preview-message"},r.a.createElement("p",null,"Image preview will be shown here after selection"))),r.a.createElement(j.a,{variant:"primary",type:"submit"},"Submit")))},y=function(){return r.a.createElement("div",{className:"header"},r.a.createElement("h1",null,"File Upload And Download"),r.a.createElement("nav",null,r.a.createElement(s.b,{activeClassName:"active",to:"/",exact:!0},"Home"),r.a.createElement(s.b,{activeClassName:"active",to:"/list"},"Files List")))},N=a(37),k=a.n(N),D=function(){var e=Object(n.useState)([]),t=Object(f.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(""),s=Object(f.a)(c,2),o=s[0],i=s[1];Object(n.useEffect)((function(){(function(){var e=Object(m.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.a.get("".concat(O,"/getAllFiles"));case 3:t=e.sent,a=t.data,i(""),l(a),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),e.t0.response&&i(e.t0.response.data);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}})()()}),[]);var p=function(){var e=Object(m.a)(u.a.mark((function e(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.a.delete("".concat(O,"/delete/").concat(t));case 3:(a=e.sent).data.success&&alert(a.data.errorMsg),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(o);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(m.a)(u.a.mark((function e(t,a,n){var r,l,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.a.get("".concat(O,"/download/").concat(t),{responseType:"blob"});case 3:return r=e.sent,l=a.split("/"),c=l[l.length-1],i(""),e.abrupt("return",k()(r.data,c,n));case 10:e.prev=10,e.t0=e.catch(0),e.t0.response&&400===e.t0.response.status&&i("Error while downloading file. Try again later");case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,a,n){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"files-container"},o&&r.a.createElement("p",{className:"errorMsg"},o),r.a.createElement("table",{className:"files-table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Title"),r.a.createElement("th",null,"Description"),r.a.createElement("th",null,"Download/Delete"),r.a.createElement("th",null,"Edit"))),r.a.createElement("tbody",null,a.length>0?a.map((function(e){var t=e._id,a=e.title,n=e.description,l=e.file_path,c=e.file_mimetype;return r.a.createElement("tr",{key:t},r.a.createElement("td",{className:"file-title"},a),r.a.createElement("td",{className:"file-description"},n),r.a.createElement("td",null,r.a.createElement("a",{href:"#/",onClick:function(){return d(t,l,c)}},"Download/"),r.a.createElement("a",{href:"#/",onClick:function(){return p(t,l)}},"Delete")),r.a.createElement("td",null,r.a.createElement("a",{href:"#/"},"Edit")))})):r.a.createElement("tr",null,r.a.createElement("td",{colSpan:3,style:{fontWeight:"300"}},"No files found. Please add some.")))))},S=function(){return r.a.createElement(s.a,null,r.a.createElement("div",{className:"container"},r.a.createElement(y,null),r.a.createElement("div",{className:"main-content"},r.a.createElement(o.c,null,r.a.createElement(o.a,{component:x,path:"/",exact:!0}),r.a.createElement(o.a,{component:D,path:"/list"})))))};a(68),a(69);c.a.render(r.a.createElement(S,null),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.2e494a07.chunk.js.map