(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0554da0c"],{"02b3":function(t,e,i){},"0356":function(t,e,i){"use strict";i("02b3")},"60e8":function(t,e,i){},"696f":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("loading-component",{attrs:{value:t.loading}}),i("loading-component",{attrs:{value:t.loading2}}),t.loading?t._e():i("div",[i("v-layout",{staticClass:"pa-0",attrs:{row:"",wrap:""}},t._l(t.groups,(function(e,s){return i("v-flex",{key:s,staticClass:"mr-4 mb-4",attrs:{xs5:""}},[i("v-card",{staticStyle:{padding:"20px"}},[i("v-card-title",{attrs:{"primary-title":""}},[i("h2",{staticClass:"headline mb-0 primary--text"},[t._v(t._s(e.name)+" Group:")]),i("v-spacer"),i("h3",[t._v(t._s(e.description))])],1),i("v-card-actions",[e.joined?t._e():i("v-btn",{attrs:{small:"",outlined:"",color:"secondary"},on:{click:function(i){return t.joinGroup(e.id,s)}}},[t._v("Join ")]),i("v-btn",{attrs:{flat:"",color:"accent"},on:{click:function(e){return t.visitGroup(s)}}},[t._v("Explore")])],1)],1)],1)})),1)],1)],1)},a=[],n=(i("7f7f"),i("6762"),i("2fdb"),i("45d0")),o=i("7c2a"),r={name:"Groups",components:{LoadingComponent:n["a"],Posts:o["a"]},data:function(){return{groups:null,userGroups:this.$store.state.user.groups,loading:!0,loading2:!1}},mounted:function(){this.fetchGroups()},methods:{fetchGroups:function(){var t=this;this.axios.get(this.api.ACTIONS.GROUPS,{params:{page_size:100,page:1}}).then((function(e){t.groups=e.data.data.groups;var i=t.userGroups.map((function(t){return t.id}));t.groups.map((function(t){return t.joined=i.includes(t.id)})),t.loading=!1})).catch((function(e){t.error=e.response.data.message})).finally((function(){return t.loading=!1}))},joinGroup:function(t,e){var i=this;this.loading2=!0,this.axios.post(this.api.ACTIONS.JOIN_GROUP(t)).then((function(){i.groups[e].joined=!0,window.getApp.$emit("SHOW_TOAST","Joined!","success")})).catch((function(t){message=t.response.data.message,window.getApp.$emit("SHOW_TOAST",message,"red")})).finally((function(){return i.loading2=!1}))},visitGroup:function(t){var e=this.groups[t];this.$router.push({name:"Group",params:{id:e.id,name:e.name,joined:e.joined}})}}},c=r,l=i("2877"),d=i("6544"),u=i.n(d),h=i("8336"),p=i("b0af"),m=i("99d9"),f=i("12b2"),v=i("0e8f"),g=i("a722"),_=i("9910"),x=Object(l["a"])(c,s,a,!1,null,"6602f9a0",null);e["default"]=x.exports;u()(x,{VBtn:h["a"],VCard:p["a"],VCardActions:m["a"],VCardTitle:f["a"],VFlex:v["a"],VLayout:g["a"],VSpacer:_["a"]})},"7c2a":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("loading-component",{attrs:{value:t.loading}}),t._l(t.posts,(function(e,s){return i("div",{key:s},[i("post",{attrs:{id:e.id,filter:t.filter}})],1)}))],2)},a=[],n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.loading?t._e():i("div",[i("loading-component",{attrs:{value:t.loading}}),i("v-layout",{staticClass:"wrap-layout mb-3"},[i("v-flex",{attrs:{xs12:"","m-3":""}},[i("v-layout",{staticClass:"pa-1",attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{xs1:""}},[i("div",{staticClass:"headline font-weight-bold"},[i("v-avatar",{attrs:{size:"100%"}},[i("img",{attrs:{src:t.api.GET_IMAGE(t.image),alt:"Michael Wang"}})])],1)]),i("v-flex",{staticClass:"pl-3",attrs:{xs11:""}},[i("div",[i("v-layout",{staticClass:"pa-1",attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{xs11:""}},[i("h2",{staticClass:"primary--text"},[t._v(t._s(this.post.user_name)+" "),"group_posts"!==t.filter?i("span",{staticClass:"black--text font-weight-light"},[i("v-icon",[t._v("arrow_forward")]),i("span",{staticClass:"secondary--text"},[t._v(t._s(this.post.group_name))])],1):t._e()])]),i("v-flex",{attrs:{xs1:""}},[t.post.is_mated?t._e():i("v-tooltip",{attrs:{bottom:"",color:"success"},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on;return[i("v-scroll-x-transition",[t.post.is_mated?t._e():i("v-icon",t._g({staticClass:"animate",attrs:{color:"grey",large:""},on:{click:function(e){return t.markAsMated()}}},s),[t._v(" check_circle_outline ")])],1)]}}],null,!1,2471747738)},[i("span",{attrs:{color:"green"}},[t._v("Mark as Mated!")])]),i("v-scroll-x-transition",[t.post.is_mated?i("v-icon",{staticClass:"animate",attrs:{color:"success",large:""}},[t._v("check_circle")]):t._e()],1)],1)],1),i("p",[t._v(t._s(this.post.content))])],1)]),i("v-flex",{attrs:{xs12:""}},[i("v-card-text",{staticClass:"m-8"},[i("v-divider"),i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{xs2:""}},[i("v-btn",{attrs:{flat:"",color:"secondary"},on:{click:function(e){return t.toggleLike()}}},[i("v-icon",{staticClass:"mr-2"},[t._v("thumb_up")]),t.post.is_liked?i("span",[t._v("Liked")]):i("span",[t._v("Like")])],1)],1),i("v-flex",{attrs:{xs2:""}},[i("v-btn",{attrs:{flat:"",color:"accent"},on:{click:function(e){t.addComment=!0}}},[i("v-icon",{staticClass:"mr-2"},[t._v("chat")]),t._v(" comment ")],1)],1),i("v-flex",{attrs:{xs4:""}}),i("v-flex",{staticStyle:{margin:"auto","text-align":"right"},attrs:{xs2:""}},[i("h3",{staticClass:"post-info"},[t._v(t._s(this.post.likes_counter)+" likes")])]),i("v-flex",{staticStyle:{margin:"auto 0","text-align":"right"},attrs:{xs2:""}},[i("h3",{staticClass:"mr-2 post-info"},[t._v(t._s(this.post.comments_counter)+" comments")])])],1),i("v-divider")],1),i("div",{staticStyle:{"padding-left":"30px"}},[i("h3",{staticClass:"mb-3 font-weight-medium"},[t._v("Comments")]),t._l(t.post.comments,(function(t,e){return i("div",{key:e},[i("comment",{attrs:{data:t}})],1)})),0==t.post.comments.length?i("div",[i("h3",{staticClass:"font-weight-light",staticStyle:{color:"grey"}},[t._v("No Comments Yet.")])]):t._e(),t.addComment?i("div",[i("v-textarea",{attrs:{outline:"",rows:"1",label:"Add Comment"},model:{value:t.newComment,callback:function(e){t.newComment=e},expression:"newComment"}}),i("v-card-actions",{staticStyle:{"margin-top":"-27px"}},[i("v-btn",{attrs:{small:"",outlined:"",color:"accent"},on:{click:function(e){return t.addNewComment()}}},[t._v("Post")]),i("v-btn",{attrs:{small:"",outlined:""},on:{click:function(e){t.addComment=!1}}},[t._v("Cancel")])],1)],1):t._e()],2)],1)],1)],1)],1)],1)},o=[],r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-layout",{attrs:{row:"",wrap:"",className:"pa-1"}},[i("v-flex",{attrs:{xs1:""}},[i("div",{attrs:{className:"headline font-weight-bold"}},[i("v-avatar",{attrs:{size:"80%"}},[i("img",{attrs:{src:t.api.GET_IMAGE(t.image),alt:"Michael Wang"}})])],1)]),i("v-flex",{attrs:{xs11:"",className:"pl-3"}},[i("div",{staticClass:"font-weight-light"},[i("h3",{staticClass:"primary--text "},[t._v(t._s(this.data.user_name))]),i("p",[t._v(t._s(this.data.content))]),i("v-spacer")],1)])],1)],1)},c=[],l={name:"Comment",props:{data:Object},computed:{image:function(){return this.$store.state.user.profile_image}}},d=l,u=i("2877"),h=i("6544"),p=i.n(h),m=i("8212"),f=i("0e8f"),v=i("a722"),g=i("9910"),_=Object(u["a"])(d,r,c,!1,null,"c32b79be",null),x=_.exports;p()(_,{VAvatar:m["a"],VFlex:f["a"],VLayout:v["a"],VSpacer:g["a"]});var b=i("45d0"),C={name:"Post",components:{LoadingComponent:b["a"],Comment:x},props:["id","filter"],data:function(){return{loading:!0,mated:!1,post:null,addComment:!1,newComment:null}},mounted:function(){this.fetchPost()},methods:{markAsMated:function(){var t=this;this.mated=!0,this.axios.post(this.api.ACTIONS.MATED_TOGGLE(this.id)).then((function(e){t.post.is_mated=!t.post.is_mated;var i=t.post.is_mated?"Mated!":"De-mated";t.post.likes_counter+=t.post.is_mated?1:-1,window.getApp.$emit("SHOW_TOAST",i,"success")})).catch((function(t){window.getApp.$emit("SHOW_TOAST","You can't do this action.","red")}))},fetchPost:function(){var t=this;this.axios.get(this.api.ACTIONS.POST(this.id)).then((function(e){t.loading=!1,t.post=e.data.data}))},addNewComment:function(){var t=this;this.axios.post(this.api.ACTIONS.ADD_COMMENT(this.id),{content:this.newComment}).then((function(e){window.getApp.$emit("SHOW_TOAST","Comment Added Successfully!","success"),t.newComment=null,t.addComment=!1,t.fetchPost()})).catch((function(t){window.getApp.$emit("SHOW_TOAST","Something Went Wrong","red")}))},toggleLike:function(){var t=this;this.axios.post(this.api.ACTIONS.LIKE_TOGGLE(this.id)).then((function(e){var i=e.data.message;t.post.is_liked=!t.post.is_liked,t.post.likes_counter+=t.post.is_liked?1:-1,window.getApp.$emit("SHOW_TOAST",i,"success")})).catch((function(t){window.getApp.$emit("SHOW_TOAST","Something Went Wrong","red")}))}},computed:{image:function(){return this.$store.state.user.profile_image}}},w=C,y=(i("0356"),i("8336")),A=i("99d9"),S=i("ce7e"),O=i("132d"),T=i("0789"),k=i("a844"),V=(i("60e8"),i("b64a")),G=i("163b"),I=i("c69d"),$=i("30d4"),L=i("b8d7"),N=i("98a1"),W=i("80d2"),j=i("d9bd");function E(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var P={name:"v-tooltip",mixins:[V["a"],G["a"],I["a"],$["a"],L["a"],N["a"]],props:{closeDelay:{type:[Number,String],default:200},debounce:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:200},tag:{type:String,default:"span"},transition:String,zIndex:{default:null}},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,i=t.content,s=!this.bottom&&!this.left&&!this.top&&!this.right,a=this.isAttached?e.offsetLeft:e.left,n=0;return this.top||this.bottom||s?n=a+e.width/2-i.width/2:(this.left||this.right)&&(n=a+(this.right?e.width:-i.width)+(this.right?10:-10)),this.nudgeLeft&&(n-=parseInt(this.nudgeLeft)),this.nudgeRight&&(n+=parseInt(this.nudgeRight)),this.calcXOverflow(n,this.dimensions.content.width)+"px"},calculatedTop:function(){var t=this.dimensions,e=t.activator,i=t.content,s=this.isAttached?e.offsetTop:e.top,a=0;return this.top||this.bottom?a=s+(this.bottom?e.height:-i.height)+(this.bottom?10:-10):(this.left||this.right)&&(a=s+e.height/2-i.height/2),this.nudgeTop&&(a-=parseInt(this.nudgeTop)),this.nudgeBottom&&(a+=parseInt(this.nudgeBottom)),this.calcYOverflow(a+this.pageYOffset)+"px"},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left}},computedTransition:function(){return this.transition?this.transition:this.top?"slide-y-reverse-transition":this.right?"slide-x-transition":this.bottom?"slide-y-transition":this.left?"slide-x-reverse-transition":""},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(W["c"])(this.maxWidth),minWidth:Object(W["c"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(W["m"])(this,"activator",!0)&&Object(j["a"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},genActivator:function(){var t=this,e=this.disabled?{}:{mouseenter:function(e){t.getActivator(e),t.runDelay("open")},mouseleave:function(e){t.getActivator(e),t.runDelay("close")}};if("scoped"===Object(W["m"])(this,"activator")){var i=this.$scopedSlots.activator({on:e});return this.activatorNode=i,i}return this.$createElement("span",{on:e,ref:"activator"},this.$slots.activator)}},render:function(t){var e,i=t("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(e={},E(e,this.contentClass,!0),E(e,"menuable__content__active",this.isActive),E(e,"v-tooltip__content--fixed",this.activatorFixed),e),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.showLazyContent(this.$slots.default));return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[t("transition",{props:{name:this.computedTransition}},[i]),this.genActivator()])}},M=Object(u["a"])(w,n,o,!1,null,"2c047ca0",null),D=M.exports;p()(M,{VAvatar:m["a"],VBtn:y["a"],VCardActions:A["a"],VCardText:A["b"],VDivider:S["a"],VFlex:f["a"],VIcon:O["a"],VLayout:v["a"],VScrollXTransition:T["c"],VTextarea:k["a"],VTooltip:P});var z={name:"Posts",components:{LoadingComponent:b["a"],Post:D},props:["filter","group_id"],data:function(){return{posts:null,loading:!0}},mounted:function(){this.fetchPosts()},methods:{fetchPosts:function(){var t=this;this.axios.get(this.api.ACTIONS.POSTS,{params:{page_size:100,page:1,filter:this.filter,group_id:this.group_id}}).then((function(e){t.posts=e.data.data.posts,t.loading=!1}))}}},H=z,B=Object(u["a"])(H,s,a,!1,null,"51c9d094",null);e["a"]=B.exports}}]);
//# sourceMappingURL=chunk-0554da0c.a38a7178.js.map