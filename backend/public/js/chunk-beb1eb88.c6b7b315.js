(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-beb1eb88"],{3292:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("loading-component",{attrs:{value:t.loading}}),s("v-card",{staticClass:"pa-3 background"},[s("v-layout",{attrs:{row:"",wrapper:""}},[s("v-flex",{attrs:{xs3:""}},[s("div",{attrs:{className:"headline font-weight-bold"}},[s("v-avatar",{attrs:{size:"90%"}},[s("img",{attrs:{src:t.api.GET_IMAGE(this.user.image)}})])],1)]),s("v-flex",{staticClass:"pl-3 pt-3",attrs:{xs10:""}},[s("div",{staticClass:"font-weight-light"},[s("h1",{staticClass:"primary--text font-weight-regular"},[s("span",{staticClass:"black--text font-weight-thin"},[t._v("Hi I'm ")]),t._v(t._s(this.user.name))]),s("h3",{staticClass:"accent--text font-weight-light"},[t._v(t._s("MALE"===this.user.gender?"Male":"Female"))]),s("h3",{staticClass:" font-weight-light"},[t._v(t._s(this.age)+" years old.")])])]),this.$store.state.user.id==this.$route.params.id?s("v-flex",{staticStyle:{"text-align":"right"},attrs:{xs3:""}},[s("v-btn",{staticStyle:{"text-align":"right"},attrs:{small:"",dark:"",fab:"",color:"secondary"},on:{click:function(e){t.dialog=!0}}},[s("v-icon",[t._v("edit")])],1)],1):t._e()],1),s("v-flex",{attrs:{xs12:""}},[t.user.interests.length?s("div",[s("div",{staticClass:" ma-2"},[s("h2",{staticClass:"font-weight-light"},[t._v("I'm interested in: ")]),t._l(t.user.interests,(function(e,i){return s("v-chip",{key:i,staticClass:"chip font-weight-regular",attrs:{disabled:"","text-color":t.colors[i%3]}},[t._v(" "+t._s(e.name)+" ")])}))],2)]):t._e()]),s("v-flex",{attrs:{xs12:""}},[s("h2",{staticClass:"font-weight-light"},[t._v("Contact me via: ")]),s("h3",{staticClass:"font-weight-light text-sm-left accent--text"},[t._v(t._s(this.user.email))])])],1),t.loading?t._e():s("posts",{attrs:{filter:t.filter}}),s("v-dialog",{attrs:{width:"600",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[s("v-card",{attrs:{width:"100%"}},[s("v-card-title",{staticClass:"headline lighten-2",attrs:{"primary-title":""}},[t._v(" Update Profile: ")]),s("v-card-text",{staticClass:"p-0"},[s("v-text-field",{attrs:{label:"Name"},model:{value:t.user.name,callback:function(e){t.$set(t.user,"name",e)},expression:"user.name"}}),s("ChooseDate",{attrs:{label:"Birthday"},model:{value:t.user.birthday,callback:function(e){t.$set(t.user,"birthday",e)},expression:"user.birthday"}}),s("v-select",{attrs:{width:"90%",items:t.interests,name:"name","item-text":"name","item-value":"id",chips:"",label:"Interests",multiple:""},on:{change:function(e){t.interestsUpdated=!0}},model:{value:t.user.interests,callback:function(e){t.$set(t.user,"interests",e)},expression:"user.interests"}})],1),s("v-card-actions",[s("v-btn",{attrs:{color:"light-grey"},on:{click:function(e){t.dialog=!1}}},[t._v(" Cancel ")]),s("v-btn",{attrs:{color:"primary"},on:{click:function(e){return t.updateUser()}}},[t._v(" Add ")])],1)],1)],1)],1)},a=[],n=s("45d0"),o=s("7c2a"),r=s("c0d6"),l=s("209d"),c={name:"UserProfile",title:"User Profile",components:{ChooseDate:l["a"],Posts:o["a"],LoadingComponent:n["a"]},props:["id"],data:function(){return{loading:!0,user:null,age:null,colors:["primary","secondary","accent"],dialog:!1,interestsUpdated:!1,filter:{type:"users",user_id:this.$route.params.id}}},mounted:function(){this.fetchUser(),this.fetchInterests()},methods:{calcAge:function(t){var e=new Date,s=new Date(t),i=e.getFullYear()-s.getFullYear(),a=e.getMonth()-s.getMonth();return(a<0||0===a&&e.getDate()<s.getDate())&&i--,i},fetchInterests:function(){var t=this;this.axios.get(this.api.ACTIONS.INTERESTS).then((function(e){var s=e.data;t.interests=s.data,t.loading=!1})).catch((function(){return t.$router.push({name:"NotFound"})}))},fetchUser:function(){var t=this;this.axios.get(this.api.ACTIONS.USER(this.$route.params.id)).then((function(e){var s=e.data;t.user=s.data,t._user=Object.assign({},t.user),t.age=t.calcAge(t.user.birthday),r["a"].dispatch("validateToken"),t.loading=!1})).catch((function(){return t.$router.push({name:"NotFound"})}))},updateUser:function(){var t=this;this.loading=!0,this.user.interest_ids=this.user.interests,this.interestsUpdated||delete this.user.interest_ids,delete this.user.image,this.axios.post(this.api.ACTIONS.UPDATE_PROFILE,this.user).then((function(){t.dialog=!1,window.getApp.$emit("SHOW_TOAST","Updated!","success"),t.fetchUser()})).catch((function(t){window.getApp.$emit("SHOW_TOAST","Something went wrong","red")})).finally((function(){return t.loading=!1}))}}},d=c,h=s("2877"),u=s("6544"),p=s.n(u),m=s("8212"),f=s("8336"),v=s("b0af"),g=s("99d9"),_=s("12b2"),x=s("cc20"),b=s("169a"),C=s("0e8f"),w=s("132d"),y=s("a722"),A=s("b56d"),S=s("2677"),T=Object(h["a"])(d,i,a,!1,null,"6fe0e79a",null);e["default"]=T.exports;p()(T,{VAvatar:m["a"],VBtn:f["a"],VCard:v["a"],VCardActions:g["a"],VCardText:g["b"],VCardTitle:_["a"],VChip:x["a"],VDialog:b["a"],VFlex:C["a"],VIcon:w["a"],VLayout:y["a"],VSelect:A["a"],VTextField:S["a"]})},"3dfb":function(t,e,s){},"60e8":function(t,e,s){},"7c2a":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("loading-component",{attrs:{value:t.loading}}),t._l(t.posts,(function(e,i){return s("div",{key:i},[s("post",{attrs:{post:e,filter:t.filter}})],1)}))],2)},a=[],n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-layout",{staticClass:"wrap-layout mb-3"},[s("v-flex",{attrs:{xs12:"","m-3":""}},[s("v-layout",{staticClass:"pa-1",attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs1:""}},[s("div",{staticClass:"headline font-weight-bold"},[s("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:{name:"UserProfile",params:{id:this.post.user_id}}}},[s("v-avatar",{attrs:{size:"100%"}},[s("img",{attrs:{src:t.api.GET_IMAGE(this.post.image),alt:"Michael Wang"}})])],1)],1)]),s("v-flex",{staticClass:"pl-3",attrs:{xs11:""}},[s("div",[s("v-layout",{staticClass:"pa-1",attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs11:""}},[s("h2",{staticClass:"primary--text"},[s("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:{name:"UserProfile",params:{id:this.post.user_id}}}},[t._v(" "+t._s(this.post.user_name)+" ")]),"group_posts"!==t.filter?s("span",{staticClass:"black--text font-weight-light"},[s("v-icon",[t._v("arrow_forward")]),s("span",{staticClass:"secondary--text"},[t._v(t._s(this.post.group_name))])],1):t._e()],1)]),this.$store.state.user.id==t.post.user_id?s("v-flex",{attrs:{xs1:""}},[t.post.is_mated?t._e():s("v-tooltip",{attrs:{bottom:"",color:"success"},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[s("v-scroll-x-transition",[t.post.is_mated?t._e():s("v-icon",t._g({staticClass:"animate",attrs:{color:"grey",large:""},on:{click:function(e){return t.markAsMated()}}},i),[t._v(" check_circle_outline ")])],1)]}}],null,!1,2471747738)},[s("span",{attrs:{color:"green"}},[t._v("Mark as Mated!")])]),s("v-scroll-x-transition",[t.post.is_mated?s("v-icon",{staticClass:"animate",attrs:{color:"success",large:""}},[t._v("check_circle")]):t._e()],1)],1):t._e()],1),s("p",[t._v(t._s(this.post.content))])],1)]),s("v-flex",{attrs:{xs12:""}},[s("v-card-text",{staticClass:"m-8"},[s("v-divider"),s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs2:""}},[s("v-btn",{attrs:{flat:"",color:"secondary"},on:{click:function(e){return t.toggleLike()}}},[s("v-icon",{staticClass:"mr-2"},[t._v("thumb_up")]),t.post.is_liked?s("span",[t._v("Liked")]):s("span",[t._v("Like")])],1)],1),s("v-flex",{attrs:{xs2:""}},[s("v-btn",{attrs:{flat:"",color:"accent"},on:{click:function(e){t.addComment=!0}}},[s("v-icon",{staticClass:"mr-2"},[t._v("chat")]),t._v(" Comment ")],1)],1),s("v-flex",{attrs:{xs4:""}}),s("v-flex",{staticStyle:{margin:"auto","text-align":"right"},attrs:{xs2:""}},[s("h3",{staticClass:"post-info"},[t._v(t._s(this.post.likes_counter)+" likes")])]),s("v-flex",{staticStyle:{margin:"auto 0","text-align":"right"},attrs:{xs2:""}},[s("h3",{staticClass:"mr-2 post-info"},[t._v(t._s(this.post.comments_counter)+" comments")])])],1),s("v-divider")],1),s("div",{staticStyle:{"padding-left":"30px"}},[s("h3",{staticClass:"mb-3 font-weight-medium"},[t._v("Comments")]),t._l(t.post.comments,(function(t,e){return s("div",{key:e},[s("comment",{attrs:{data:t}})],1)})),0==t.post.comments.length?s("div",[s("h3",{staticClass:"font-weight-light",staticStyle:{color:"grey"}},[t._v("No Comments Yet.")])]):t._e(),t.addComment?s("div",[s("v-textarea",{attrs:{outline:"",rows:"1",label:"Add Comment"},model:{value:t.newComment,callback:function(e){t.newComment=e},expression:"newComment"}}),s("v-card-actions",{staticStyle:{"margin-top":"-27px"}},[s("v-btn",{attrs:{small:"",outlined:"",color:"accent"},on:{click:function(e){return t.addNewComment()}}},[t._v("Post")]),s("v-btn",{attrs:{small:"",outlined:""},on:{click:function(e){t.addComment=!1}}},[t._v("Cancel")])],1)],1):t._e()],2)],1)],1)],1)],1)],1)},o=[],r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-layout",{attrs:{row:"",wrap:"",className:"pa-1"}},[s("v-flex",{attrs:{xs1:""}},[s("div",{attrs:{className:"headline font-weight-bold"}},[s("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:{name:"UserProfile",params:{id:this.data.user_id}}}},[s("v-avatar",{attrs:{size:"80%"}},[s("img",{attrs:{src:t.api.GET_IMAGE(this.data.image),alt:"Michael Wang"}})])],1)],1)]),s("v-flex",{attrs:{xs11:"",className:"pl-3"}},[s("div",{staticClass:"font-weight-light"},[s("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:{name:"UserProfile",params:{id:this.data.user_id}}}},[s("h3",{staticClass:"primary--text "},[t._v(t._s(this.data.user_name))])]),s("p",[t._v(t._s(this.data.content))]),s("v-spacer")],1)])],1)],1)},l=[],c={name:"Comment",props:{data:Object}},d=c,h=s("2877"),u=s("6544"),p=s.n(u),m=s("8212"),f=s("0e8f"),v=s("a722"),g=s("9910"),_=Object(h["a"])(d,r,l,!1,null,"4d12829a",null),x=_.exports;p()(_,{VAvatar:m["a"],VFlex:f["a"],VLayout:v["a"],VSpacer:g["a"]});var b=s("45d0"),C={name:"Post",components:{Comment:x},props:{post:Object,filter:Object|Array},data:function(){return{mated:!1,addComment:!1,newComment:null}},methods:{markAsMated:function(){var t=this;this.mated=!0,this.axios.post(this.api.ACTIONS.MATED_TOGGLE(this.post.id)).then((function(e){t.post.is_mated=!t.post.is_mated;var s=t.post.is_mated?"Mated!":"De-mated";t.post.likes_counter+=t.post.is_mated?1:-1,window.getApp.$emit("SHOW_TOAST",s,"success")})).catch((function(t){window.getApp.$emit("SHOW_TOAST","You can't do this action.","red")}))},fetchPost:function(){var t=this;this.axios.get(this.api.ACTIONS.POST(this.post.id)).then((function(e){t.post=e.data.data}))},addNewComment:function(){var t=this;this.axios.post(this.api.ACTIONS.ADD_COMMENT(this.post.id),{content:this.newComment}).then((function(e){window.getApp.$emit("SHOW_TOAST","Comment Added Successfully!","success"),t.newComment=null,t.addComment=!1,t.fetchPost()})).catch((function(t){window.getApp.$emit("SHOW_TOAST","Something Went Wrong","red")}))},toggleLike:function(){var t=this;this.axios.post(this.api.ACTIONS.LIKE_TOGGLE(this.post.id)).then((function(e){var s=e.data.message;t.post.is_liked=!t.post.is_liked,t.post.likes_counter+=t.post.is_liked?1:-1,window.getApp.$emit("SHOW_TOAST",s,"success")})).catch((function(t){window.getApp.$emit("SHOW_TOAST","Something Went Wrong","red")}))}},computed:{image:function(){return this.$store.state.user.image}}},w=C,y=(s("bb09"),s("8336")),A=s("99d9"),S=s("ce7e"),T=s("132d"),k=s("0789"),O=s("a844"),I=(s("60e8"),s("b64a")),V=s("163b"),$=s("c69d"),N=s("30d4"),E=s("b8d7"),P=s("98a1"),L=s("80d2"),D=s("d9bd");function M(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var W={name:"v-tooltip",mixins:[I["a"],V["a"],$["a"],N["a"],E["a"],P["a"]],props:{closeDelay:{type:[Number,String],default:200},debounce:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:200},tag:{type:String,default:"span"},transition:String,zIndex:{default:null}},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,s=t.content,i=!this.bottom&&!this.left&&!this.top&&!this.right,a=this.isAttached?e.offsetLeft:e.left,n=0;return this.top||this.bottom||i?n=a+e.width/2-s.width/2:(this.left||this.right)&&(n=a+(this.right?e.width:-s.width)+(this.right?10:-10)),this.nudgeLeft&&(n-=parseInt(this.nudgeLeft)),this.nudgeRight&&(n+=parseInt(this.nudgeRight)),this.calcXOverflow(n,this.dimensions.content.width)+"px"},calculatedTop:function(){var t=this.dimensions,e=t.activator,s=t.content,i=this.isAttached?e.offsetTop:e.top,a=0;return this.top||this.bottom?a=i+(this.bottom?e.height:-s.height)+(this.bottom?10:-10):(this.left||this.right)&&(a=i+e.height/2-s.height/2),this.nudgeTop&&(a-=parseInt(this.nudgeTop)),this.nudgeBottom&&(a+=parseInt(this.nudgeBottom)),this.calcYOverflow(a+this.pageYOffset)+"px"},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left}},computedTransition:function(){return this.transition?this.transition:this.top?"slide-y-reverse-transition":this.right?"slide-x-transition":this.bottom?"slide-y-transition":this.left?"slide-x-reverse-transition":""},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(L["c"])(this.maxWidth),minWidth:Object(L["c"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(L["m"])(this,"activator",!0)&&Object(D["a"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},genActivator:function(){var t=this,e=this.disabled?{}:{mouseenter:function(e){t.getActivator(e),t.runDelay("open")},mouseleave:function(e){t.getActivator(e),t.runDelay("close")}};if("scoped"===Object(L["m"])(this,"activator")){var s=this.$scopedSlots.activator({on:e});return this.activatorNode=s,s}return this.$createElement("span",{on:e,ref:"activator"},this.$slots.activator)}},render:function(t){var e,s=t("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(e={},M(e,this.contentClass,!0),M(e,"menuable__content__active",this.isActive),M(e,"v-tooltip__content--fixed",this.activatorFixed),e),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.showLazyContent(this.$slots.default));return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[t("transition",{props:{name:this.computedTransition}},[s]),this.genActivator()])}},U=Object(h["a"])(w,n,o,!1,null,"21e95df5",null),j=U.exports;p()(U,{VAvatar:m["a"],VBtn:y["a"],VCardActions:A["a"],VCardText:A["b"],VDivider:S["a"],VFlex:f["a"],VIcon:T["a"],VLayout:v["a"],VScrollXTransition:k["c"],VTextarea:O["a"],VTooltip:W});var F={name:"Posts",components:{LoadingComponent:b["a"],Post:j},props:["filter"],data:function(){return{posts:null,loading:!0}},mounted:function(){this.fetchPosts()},methods:{fetchPosts:function(){var t=this,e=[];e["type"]=this.filter.type,e["user_id"]=this.filter.user_id?this.filter.user_id:null,e["group_id"]=this.filter.group_id?this.filter.group_id:null;e["type"],e["user_id"],e["group_id"];this.axios.get(this.api.ACTIONS.POSTS,{params:{filter_type:this.filter.type,user_id:this.filter.user_id?this.filter.user_id:null,group_id:this.filter.group_id?this.filter.group_id:null,page_size:200,page:1}}).then((function(e){t.posts=e.data.data.posts,t.loading=!1}))}}},G=F,H=Object(h["a"])(G,i,a,!1,null,"29ca73ca",null);e["a"]=H.exports},bb09:function(t,e,s){"use strict";s("3dfb")}}]);
//# sourceMappingURL=chunk-beb1eb88.c6b7b315.js.map