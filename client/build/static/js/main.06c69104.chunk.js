(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{23:function(e,t,s){},60:function(e,t,s){},66:function(e,t,s){},69:function(e,t,s){},70:function(e,t,s){},71:function(e,t,s){},72:function(e,t,s){"use strict";s.r(t);var n=s(1),a=s(37),c=s.n(a),o=s(3),i=s(4),r=s(6),l=s(5),d=s(15),h=s(7),j=s(20),u=s(14),p=s.n(u),m=(s(60),s(0)),b=function(e){Object(r.a)(s,e);var t=Object(l.a)(s);function s(){var e;Object(o.a)(this,s);for(var n=arguments.length,a=new Array(n),c=0;c<n;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={userName:"",email:"",password:""},e.handleChange=function(t){var s=t.target,n=s.name,a=s.value;e.setState(Object(j.a)({},n,a))},e.submit=function(t){t.preventDefault();var s={userName:e.state.userName,email:e.state.email,password:e.state.password};console.log("Submitting: "+JSON.stringify(s)),p()({url:"http://localhost:8080/users/signup",method:"POST",data:s}).then((function(t){console.log("Success"),console.log(t),"success"===t.data.status?(alert("Success"),e.props.history.push("/content")):t.data.errors.userName.length>0?alert(t.data.errors.userName):t.data.errors.email.length?alert(t.data.errors.email):t.data.errors.password.length&&alert(t.data.errors.password)})).catch((function(e){console.log("Internal server error"),alert("Internal Server Error. Please try again."),console.log(e)}))},e}return Object(i.a)(s,[{key:"render",value:function(){return console.log("state: ",this.state),Object(m.jsx)("div",{className:"register_wrapper",children:Object(m.jsx)("header",{className:"register_header",children:Object(m.jsxs)("div",{className:"form_box",children:[Object(m.jsxs)("div",{className:"button_box",children:[Object(m.jsx)("a",{href:"#",id:"register",className:"btn btn-primary",children:"Register"}),Object(m.jsx)(d.b,{to:"/login",className:"btn",id:"login",role:"button",children:"Login"})]}),Object(m.jsx)("div",{className:"icon_img",children:Object(m.jsx)("img",{src:"/towson-branded-logos/TowsonU_ConnectLogo-pos.png",alt:""})}),Object(m.jsxs)("form",{onSubmit:this.submit,children:[Object(m.jsx)("div",{className:"form-group",children:Object(m.jsx)("input",{type:"text",name:"userName",value:this.state.userName,onChange:this.handleChange,className:"form-control form-warning",id:"exampleInputEmail1",placeholder:"Username"})}),Object(m.jsx)("div",{className:"form-group",children:Object(m.jsx)("input",{type:"email",name:"email",value:this.state.email,onChange:this.handleChange,className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"example@gmail.com"})}),Object(m.jsx)("div",{className:"form-group",children:Object(m.jsx)("input",{type:"password",name:"password",value:this.state.password,onChange:this.handleChange,className:"form-control",id:"exampleInputPassword1",placeholder:"Password"})}),Object(m.jsx)("a",{href:"#",children:"Forgot Password?"}),Object(m.jsx)("button",{className:"btn btn-primary btn-block",children:"Submit"})]}),Object(m.jsx)("br",{}),Object(m.jsxs)("span",{children:["You are agreed with our ",Object(m.jsx)("a",{href:"#",children:"Terms & Conditions "}),"and",Object(m.jsx)("a",{href:"#",children:" Privacy Policies"})]})]})})})}}]),s}(n.Component),O=(s(66),function(e){Object(r.a)(s,e);var t=Object(l.a)(s);function s(){var e;Object(o.a)(this,s);for(var n=arguments.length,a=new Array(n),c=0;c<n;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={userNameOremail:"",password:""},e.handleChange=function(t){var s=t.target,n=s.name,a=s.value;e.setState(Object(j.a)({},n,a))},e.submit=function(t){t.preventDefault();var s={userNameOrEmail:e.state.userNameOrEmail,password:e.state.password};console.log("Submitting: "+JSON.stringify(s)),p()({url:"http://localhost:8080/users/login",method:"POST",data:s}).then((function(t){console.log("Success"),console.log(t),"success"===t.data.status?(alert("Success"),e.props.history.push("/content")):t.data.errors.userName.length>0||t.data.errors.email.length?alert("UserName or Email not found. Please consider Signup."):t.data.errors.password.length&&alert("Password is incorrect. Please try again.")})).catch((function(e){console.log("Internal server error"),alert("Internal Server Error. Please try again."),console.log(e)}))},e}return Object(i.a)(s,[{key:"render",value:function(){return console.log("state: ",this.state),Object(m.jsx)("div",{className:"login_wrapper",children:Object(m.jsx)("header",{className:"login_header",children:Object(m.jsxs)("div",{className:"form_box",children:[Object(m.jsxs)("div",{className:"button_box",children:[Object(m.jsx)(d.b,{to:"/register",className:"btn",id:"login",role:"button",children:"Register"}),Object(m.jsx)("a",{href:"#",id:"register",className:"btn btn-primary",children:"Login"})]}),Object(m.jsx)("div",{class:"icon_img",children:Object(m.jsx)("img",{src:"/towson-branded-logos/TowsonU_ConnectLogo-pos.png",alt:""})}),Object(m.jsxs)("form",{onSubmit:this.submit,children:[Object(m.jsx)("div",{className:"form-group",children:Object(m.jsx)("input",{type:"text",name:"userNameOrEmail",value:this.state.userNameOrEmail,onChange:this.handleChange,className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Email Or Username"})}),Object(m.jsx)("div",{className:"form-group",children:Object(m.jsx)("input",{type:"password",name:"password",value:this.state.password,onChange:this.handleChange,className:"form-control",id:"exampleInputPassword1",placeholder:"Password"})}),Object(m.jsx)("button",{className:"btn btn-primary",children:"Submit"})]}),Object(m.jsxs)("span",{children:["You are agreed with our ",Object(m.jsx)("a",{href:"#",children:"Terms & Conditions "}),"and",Object(m.jsx)("a",{href:"#",children:" Privacy Policies"})]})]})})})}}]),s}(n.Component)),g=s(9),f=function(){return Object(m.jsx)("div",{className:"user-icon",children:Object(m.jsx)("img",{src:"/nav-logos/user-icon.png",alt:"Default User Head"})})};function v(){return Object(m.jsx)("div",{className:"login-div",children:Object(m.jsx)("a",{href:"/",onClick:function(e){e.preventDefault(),alert("Login will be handled here")},className:"login-link",children:"login"})})}function x(){return Object(m.jsx)("div",{className:"logout-div",children:Object(m.jsx)("a",{href:"/",onClick:function(e){e.preventDefault(),alert("Logout will be handled here")},className:"logout-link",children:"login"})})}var N=function(e){return e.isLoggedIn?Object(m.jsxs)("div",{className:"accountFlex",children:[Object(m.jsx)(f,{}),Object(m.jsx)(x,{})]}):Object(m.jsxs)("div",{className:"accountFlex",children:[Object(m.jsx)(f,{}),Object(m.jsx)(v,{})]})},C=function(){return Object(m.jsx)(n.Fragment,{children:Object(m.jsxs)("div",{className:"header-top",children:[Object(m.jsx)("div",{className:"logo-icon",children:Object(m.jsx)("img",{src:"/towson-branded-logos/TowsonU_ConnectLogo.png",alt:"Towson University Logo",className:"towsonLogo"})}),Object(m.jsx)(N,{})]})})},y=function(e){Object(r.a)(s,e);var t=Object(l.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).handleClick=n.handleClick.bind(Object(g.a)(n)),n}return Object(i.a)(s,[{key:"handleClick",value:function(e){e.preventDefault(),this.props.onSelect(this.props.selectedId)}},{key:"render",value:function(){return this.props.selected?Object(m.jsx)("div",{className:"linkSelected",children:Object(m.jsx)("a",{href:this.props.href,onClick:this.handleClick,children:this.props.linkName})}):Object(m.jsx)("div",{className:"linkUnselected",children:Object(m.jsx)("a",{href:this.props.href,onClick:this.handleClick,children:this.props.linkName})})}}]),s}(n.Component),k=function(e){Object(r.a)(s,e);var t=Object(l.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(i.a)(s,[{key:"render",value:function(){var e=this.props.selectedItem;return 0===e?(console.log("Notification"),Object(m.jsxs)("div",{className:"navbox",children:[Object(m.jsx)(y,{linkName:"Courses",href:"/courses",selected:!1,onSelect:this.props.onNavigation,selectedId:1}),Object(m.jsx)(y,{linkName:"Notifications",href:"/notifications",selected:!0,onSelect:this.props.onNavigation,selectedId:0})]})):1===e?(console.log("Courses"),Object(m.jsxs)("div",{className:"navbox",children:[Object(m.jsx)(y,{linkName:"Courses",href:"/courses",selected:!0,onSelect:this.props.onNavigation,selectedId:1}),Object(m.jsx)(y,{linkName:"Notifications",href:"/notifications",isSelected:!1,onSelect:this.props.onNavigation,selectedId:0})]})):void 0}}]),s}(n.Component),S=(s(16),s(36),s(23),s(18)),w=function(e){Object(r.a)(s,e);var t=Object(l.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).handleClick=n.handleClick.bind(Object(g.a)(n)),n}return Object(i.a)(s,[{key:"handleClick",value:function(e){e.preventDefault(),this.props.onSelect(this.props.itemNum,this.props.notificationType)}},{key:"render",value:function(){return this.props.isSelected?Object(m.jsx)("div",{className:"notificationButton",children:Object(m.jsx)("button",{className:"sideBarLink",onClick:this.handleClick,children:Object(m.jsx)(S.a,{className:"highlighted",icon:["fas",this.props.fontAwesomeIcon],size:"3x"})})}):Object(m.jsx)("div",{className:"notificationButton",children:Object(m.jsx)("button",{onClick:this.handleClick,children:Object(m.jsx)(S.a,{className:"unhighlighted",icon:["fas",this.props.fontAwesomeIcon],size:"3x"})})})}}]),s}(n.Component),_=function(e){Object(r.a)(s,e);var t=Object(l.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).state={highlighted:0},n.handleNavigation=n.handleNavigation.bind(Object(g.a)(n)),n}return Object(i.a)(s,[{key:"handleNavigation",value:function(e,t){this.setState({highlighted:e}),this.props.onNavigation(t)}},{key:"render",value:function(){return 0===this.state.highlighted?Object(m.jsxs)("div",{className:"sideBar",children:[Object(m.jsx)(w,{isSelected:!0,fontAwesomeIcon:"bell",className:"bellIcon",onSelect:this.handleNavigation,notificationType:"Notifications",itemNum:0}),Object(m.jsx)(w,{isSelected:!1,fontAwesomeIcon:"comment",className:"messageIcon",onSelect:this.handleNavigation,notificationType:"Messages",itemNum:1})]}):1===this.state.highlighted?Object(m.jsxs)("div",{className:"sideBar",children:[Object(m.jsx)(w,{isSelected:!1,fontAwesomeIcon:"bell",className:"bellIcon",onSelect:this.handleNavigation,notificationType:"Notifications",itemNum:0}),Object(m.jsx)(w,{isSelected:!0,fontAwesomeIcon:"comment",className:"messageIcon",onSelect:this.handleNavigation,notificationType:"Messages",itemNum:1})]}):void 0}}]),s}(n.Component),I=function(e){Object(r.a)(s,e);var t=Object(l.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).handleClick=n.handleClick.bind(Object(g.a)(n)),n}return Object(i.a)(s,[{key:"handleClick",value:function(){return this.props.onClick(this.props.id)}},{key:"render",value:function(){return this.props.selected?Object(m.jsx)("li",{className:"courseSelector",id:this.props.id,children:Object(m.jsxs)("div",{className:"selectedCourse",children:[Object(m.jsx)("p",{onClick:this.handleClick,children:Object(m.jsx)("b",{children:this.props.courseName})}),Object(m.jsx)("p",{children:this.props.teacherName})]})}):Object(m.jsx)("li",{className:"courseSelector",id:this.props.id,children:Object(m.jsxs)("div",{className:"unselectedCourse",children:[Object(m.jsx)("p",{onClick:this.handleClick,children:this.props.courseName}),Object(m.jsx)("p",{children:this.props.teacherName})]})})}}]),s}(n.Component),L=function(e){Object(r.a)(s,e);var t=Object(l.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).componentDidMount=function(){p()({url:"https://jsonplaceholder.typicode.com/comments",method:"get",headers:{"Content-Type":"application/json"}}).then((function(e){for(var t=e.data,s=Array(),a=0;a<10;a++){var c={id:t[a].id,name:t[a].name,teacher:t[a].email};s.push(c),console.log("Got Course :"+s[a].name)}n.setState({courseList:s})})).catch((function(e){console.log(e)}))},n.state={courseList:[],selected:0},n.getCourseSelected=n.getCourseSelected.bind(Object(g.a)(n)),n}return Object(i.a)(s,[{key:"getCourseSelected",value:function(e){this.setState({selected:e});var t=this.state.courseList[e].name;return this.props.onCourseChange(t)}},{key:"render",value:function(){var e=this,t=this.state.courseList;console.log(t);var s=t.map((function(t,s){var n=t.name,a=t.teacher,c=t.id;return console.log("Sending in Course Name "+n),console.log("Sending in Teacher Name: "+a),console.log("Sending in ID: "+c),Object(m.jsx)(I,{courseName:n,teacherName:a,id:s,onClick:e.getCourseSelected,selected:e.state.selected==s},c)}));return Object(m.jsxs)("div",{className:"dynamic_course_div",children:[Object(m.jsx)("div",{className:"courseSelectorHeaderDiv",children:Object(m.jsx)("h2",{children:" Courses"})}),Object(m.jsx)("ul",{className:"course_list",children:s})]})}}]),s}(n.Component),T=function(e){Object(r.a)(s,e);var t=Object(l.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).state={display:{display:"none"}},n.handleClick=n.handleClick.bind(Object(g.a)(n)),n}return Object(i.a)(s,[{key:"handleClick",value:function(e){"none"===this.state.display.display?this.setState({display:{display:"block"}}):this.setState({display:{display:"none"}})}},{key:"render",value:function(){var e=this.props.feedItemKey,t=this.props.header,s=this.props.short_Description,n=this.props.long_Description,a=this.props.location;return console.log("id in Component: "+e),console.log("header in Component: "+t),console.log("short_description in Component: "+s),console.log("long_description in Component: "+n),console.log("location in Component: "+a),console.log("The props in the component: "+JSON.stringify(this.props)),Object(m.jsxs)("div",{className:"feed-item",children:[Object(m.jsx)("h2",{className:"notificationTitle",children:this.props.header}),Object(m.jsxs)("div",{className:"collapsible",children:[this.props.short_description,Object(m.jsx)(S.a,{onClick:this.handleClick,icon:["fas","sort-down"],className:"expandIcon"}),Object(m.jsxs)("div",{className:"long-description",style:this.state.display,children:[Object(m.jsx)("p",{children:this.props.long_description}),Object(m.jsx)("a",{href:this.props.location,children:"Go to"})]})]})]})}}]),s}(n.Component),P=function(e){Object(r.a)(s,e);var t=Object(l.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).state={selectedCategory:"Notifications",selectedCourse:"All"},n.categoryChangeListener=n.categoryChangeListener.bind(Object(g.a)(n)),n.courseChangeListener=n.courseChangeListener.bind(Object(g.a)(n)),n}return Object(i.a)(s,[{key:"categoryChangeListener",value:function(e){this.setState({selectedCategory:e})}},{key:"courseChangeListener",value:function(e){this.setState({selectedCourse:e})}},{key:"render",value:function(){var e=[{_id:0,header:"Example",short_description:"This is an example.",long_description:"This is a long description of an example,which explains all of the details about a given notification\nThe type of notification is set to "+this.state.selectedCategory,hyperlink:"https://www.duckduckgo.com"}].map((function(e){var t=e._id,s=e.header,n=e.short_description,a=e.long_description,c=e.hyperlink;return console.log("id: "+t),console.log("header: "+s),console.log("short_description: "+n),console.log("long_description: "+a),console.log("location: "+c),Object(m.jsx)(T,{header:s,short_description:n,long_description:a,location:c},t)}));return Object(m.jsxs)(n.Fragment,{children:[Object(m.jsx)(_,{onNavigation:this.categoryChangeListener}),Object(m.jsxs)("div",{className:"feedbox",children:[Object(m.jsx)("div",{className:"left-feed",children:Object(m.jsx)(L,{onCourseChange:this.courseChangeListener})}),Object(m.jsx)("div",{className:"feed-items",children:e})]})]})}}]),s}(n.Component);s(69);function D(e){return Object(m.jsxs)("li",{className:"courseItem",id:e.key,children:[Object(m.jsx)("h3",{className:"courseHeader",children:"Course Name:"}),Object(m.jsxs)("a",{href:e.courseLink,className:"courseLink",children:["  ",e.courseName]}),Object(m.jsxs)("p",{className:"courseInstructor",children:["Taught by: ",e.teacherName]})]})}var E=function(e){Object(r.a)(s,e);var t=Object(l.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).state={courses:[]},n}return Object(i.a)(s,[{key:"componentDidMount",value:function(){var e=this;p()({url:"https://jsonplaceholder.typicode.com/comments",method:"get",headers:{"Content-Type":"application/json"}}).then((function(t){for(var s=t.data,n=new Array(10),a=0;a<10;a++){var c={id:s[a].id,name:s[a].name,teacher:s[a].email,link:"https://www.duckduckgo.com"};n[a]=c,console.log("Got Course Data: "+JSON.stringify(c))}e.setState({courses:n})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this.state.courses.map((function(e,t){return Object(m.jsx)(D,{courseName:e.name,teacherName:e.teacher,courseLink:e.link},e.id)}));return Object(m.jsxs)("div",{className:"courseListWrapper",children:[Object(m.jsx)("div",{className:"courseHeaderDiv",children:Object(m.jsx)("h2",{children:"Your Courses:"})}),Object(m.jsx)("ul",{className:"courseList",children:e})]})}}]),s}(n.Component);s(70);function A(e){return 0===e.content?Object(m.jsx)("div",{className:"feedWrapper",children:Object(m.jsx)(P,{})}):Object(m.jsx)("div",{className:"outerCourseWrapper",children:Object(m.jsx)(E,{})})}var U=function(e){Object(r.a)(s,e);var t=Object(l.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).state={content:0},n.handleContent=n.handleContent.bind(Object(g.a)(n)),n}return Object(i.a)(s,[{key:"handleContent",value:function(e){console.log("Called from NavBar"),this.setState({content:e})}},{key:"render",value:function(){return Object(m.jsxs)("div",{className:"content_wrapper",children:[Object(m.jsxs)("div",{className:"content_header",children:[Object(m.jsx)(C,{}),Object(m.jsx)(k,{selectedItem:this.state.content,onNavigation:this.handleContent})]}),Object(m.jsx)(A,{content:this.state.content})]})}}]),s}(n.Component),B=(s(71),function(e){Object(r.a)(s,e);var t=Object(l.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(i.a)(s,[{key:"render",value:function(){return Object(m.jsx)(d.a,{children:Object(m.jsx)("div",{children:Object(m.jsxs)(h.c,{children:[Object(m.jsx)(h.a,{exact:!0,path:"/",component:b}),Object(m.jsx)(h.a,{exact:!0,path:"/register",component:b}),Object(m.jsx)(h.a,{exact:!0,path:"/login",component:O}),Object(m.jsx)(h.a,{exact:!0,path:"/content",component:U})]})})})}}]),s}(n.Component));c.a.render(Object(m.jsx)(B,{}),document.getElementById("root"))}},[[72,1,2]]]);
//# sourceMappingURL=main.06c69104.chunk.js.map