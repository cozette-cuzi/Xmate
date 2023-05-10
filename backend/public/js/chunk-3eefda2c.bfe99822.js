(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3eefda2c"],{3252:function(t,e,s){},"4ebe":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("loading-component",{attrs:{value:t.loading}}),s("v-card",[s("v-layout",{staticClass:"pa-10 m-10",attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs10:""}},[s("v-card-title",{attrs:{"primary-title":""}},[s("div",[s("h3",{staticClass:"headline mb-0 primary--text"},[t._v(t._s(t.group.name)+" Group")]),s("div",[t._v(" "+t._s(t.group.description))])])])],1),s("v-flex",{attrs:{xs2:""}},[s("v-card-title",{attrs:{"primary-title":""}},[t.group.joined?s("v-btn",{attrs:{disabled:""}},[t._v("Joined!")]):s("v-btn",{on:{click:function(e){return t.joinGroup(t.group.id)}}},[t._v("Join")])],1)],1),s("v-flex",{staticClass:"mr-3 ml-3 mb-3",attrs:{xs12:""}},[s("v-textarea",{staticClass:"pa-0 mb-1",attrs:{outline:"",textarea:"",rows:"5",placeholder:"What are you looking for!"},model:{value:t.newPost.content,callback:function(e){t.$set(t.newPost,"content",e)},expression:"newPost.content"}}),s("v-btn",{staticStyle:{"margin-top":"-15px"},attrs:{color:"secondary"},on:{click:function(e){return t.post()}}},[t._v("Post")])],1)],1)],1),s("div",{staticClass:"mt-3"},[s("posts",{attrs:{filter:"group_posts",group_id:this.$route.params.id}})],1)],1)},a=[],o=(s("6762"),s("2fdb"),s("45d0")),n=s("7c2a"),r={name:"Group",components:{LoadingComponent:o["a"],Posts:n["a"]},data:function(){return{loading:!1,group:null,newPost:{group_id:this.$route.params.id,content:null}}},mounted:function(){this.fetchGroup()},methods:{fetchGroup:function(){var t=this;this.axios.get(this.api.ACTIONS.GROUP(this.$route.params.id)).then((function(e){var s=e.data;t.group=s.data;var i=t.$store.state.user.groups.map((function(t){return t.id}));t.group.joined=i.includes(t.group.id),t.loading=!1})).catch((function(){return t.$router.push({name:"NotFound"})}))},joinGroup:function(t){var e=this;this.loading2=!0,this.axios.post(this.api.ACTIONS.JOIN_GROUP(t)).then((function(){window.getApp.$emit("SHOW_TOAST","Joined!","success")})).catch((function(t){window.getApp.$emit("SHOW_TOAST","Something Went Wrong","red")})).finally((function(){return e.loading2=!1}))},rerender:function(){var t=this;this.show=!1,this.$nextTick((function(){t.show=!0,console.log("re-render start"),t.$nextTick((function(){console.log("re-render end")}))}))},post:function(){var t=this;this.axios.post(this.api.ACTIONS.POSTS,this.newPost).then((function(){t.rerender(),t.newPost.content=null,window.getApp.$emit("SHOW_TOAST","Posted!","success")})).catch((function(t){message=t.response.data.message,window.getApp.$emit("SHOW_TOAST",message,"red")})).finally((function(){return t.loading2=!1}))}}},c=r,l=s("2877"),u=s("6544"),d=s.n(u),h=s("8336"),p=s("b0af"),f=s("12b2"),v=s("0e8f"),m=s("a722"),g=s("a844"),x=Object(l["a"])(c,i,a,!1,null,"5d8463a2",null);e["default"]=x.exports;d()(x,{VBtn:h["a"],VCard:p["a"],VCardTitle:f["a"],VFlex:v["a"],VLayout:m["a"],VTextarea:g["a"]})},"60e8":function(t,e,s){},"7c2a":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("loading-component",{attrs:{value:t.loading}}),t._l(t.posts,(function(e,i){return s("div",{key:i},[s("post",{attrs:{id:e.id,filter:t.filter}})],1)}))],2)},a=[],o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.loading?t._e():s("div",[s("loading-component",{attrs:{value:t.loading}}),s("v-layout",{staticClass:"wrap-layout mb-3"},[s("v-flex",{attrs:{xs12:"","m-3":""}},[s("v-layout",{staticClass:"pa-1",attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs1:""}},[s("div",{staticClass:"headline font-weight-bold"},[s("v-avatar",{attrs:{size:"100%"}},[s("img",{attrs:{src:t.api.GET_IMAGE(t.image),alt:"Michael Wang"}})])],1)]),s("v-flex",{staticClass:"pl-3",attrs:{xs11:""}},[s("div",[s("v-layout",{staticClass:"pa-1",attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs11:""}},[s("h2",{staticClass:"primary--text"},[t._v(t._s(this.post.user_name)+" "),"group_posts"!==t.filter?s("span",{staticClass:"black--text font-weight-light"},[s("v-icon",[t._v("arrow_forward")]),s("span",{staticClass:"secondary--text"},[t._v(t._s(this.post.group_name))])],1):t._e()])]),s("v-flex",{attrs:{xs1:""}},[0==t.mated?s("v-tooltip",{attrs:{bottom:"",color:"success"},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[s("v-scroll-x-transition",[0==t.mated?s("v-icon",t._g({staticClass:"animate",attrs:{color:"grey",large:""},on:{click:function(e){return t.markAsMated()}}},i),[t._v(" check_circle_outline ")]):t._e()],1)]}}],null,!1,342790677)},[s("span",{attrs:{color:"green"}},[t._v("Mark as Mated!")])]):t._e(),s("v-scroll-x-transition",[1==t.mated?s("v-icon",{staticClass:"animate",attrs:{color:"success",large:""}},[t._v("check_circle")]):t._e()],1)],1)],1),s("p",[t._v(t._s(this.post.content))])],1)]),s("v-flex",{attrs:{xs12:""}},[s("v-card-text",{staticClass:"m-8"},[s("v-divider"),s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs2:""}},[s("v-btn",{attrs:{flat:"",color:"secondary"}},[s("v-icon",{staticClass:"mr-2"},[t._v("thumb_up")]),t._v(" like ")],1)],1),s("v-flex",{attrs:{xs2:""}},[s("v-btn",{attrs:{flat:"",color:"accent"}},[s("v-icon",{staticClass:"mr-2"},[t._v("chat")]),t._v(" comment ")],1)],1),s("v-flex",{attrs:{xs4:""}}),s("v-flex",{staticStyle:{margin:"auto","text-align":"right"},attrs:{xs2:""}},[s("h3",{staticClass:"post-info"},[t._v(t._s(this.post.likes_counter)+" likes")])]),s("v-flex",{staticStyle:{margin:"auto 0","text-align":"right"},attrs:{xs2:""}},[s("h3",{staticClass:"mr-2 post-info"},[t._v(t._s(this.post.comments_counter)+" comments")])])],1),s("v-divider")],1),s("div",{staticStyle:{"padding-left":"30px"}},[s("h3",{staticClass:"mb-3"},[t._v("comments")]),s("comment"),s("comment")],1)],1)],1)],1)],1)],1)},n=[],r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-layout",{attrs:{row:"",wrap:"",className:"pa-1"}},[s("v-flex",{attrs:{xs1:""}},[s("div",{attrs:{className:"headline font-weight-bold"}},[s("v-avatar",{attrs:{size:"80%"}},[s("img",{attrs:{src:t.api.GET_IMAGE(t.image),alt:"Michael Wang"}})])],1)]),s("v-flex",{attrs:{xs11:"",className:"pl-3"}},[s("div",[s("p",[t._v("here would go the post description and it won't be such a log text because I don't have that much time you know.")]),s("v-spacer")],1)])],1)],1)},c=[],l={name:"Comment",props:["id"],computed:{image:function(){return this.$store.state.user.profile_image}}},u=l,d=s("2877"),h=s("6544"),p=s.n(h),f=s("8212"),v=s("0e8f"),m=s("a722"),g=s("9910"),x=Object(d["a"])(u,r,c,!1,null,"3b774f2d",null),_=x.exports;p()(x,{VAvatar:f["a"],VFlex:v["a"],VLayout:m["a"],VSpacer:g["a"]});var b=s("45d0"),w={name:"Post",components:{LoadingComponent:b["a"],Comment:_},props:["id","filter"],data:function(){return{loading:!0,mated:!1,post:null}},mounted:function(){this.fetchPost()},methods:{markAsMated:function(){this.mated=!0,window.getApp.$emit("SHOW_TOAST","Mated!","success")},fetchPost:function(){var t=this;this.axios.get(this.api.ACTIONS.POST(this.id)).then((function(e){t.loading=!1,t.post=e.data.data}))}},computed:{image:function(){return this.$store.state.user.profile_image}}},y=w,C=(s("fb7e"),s("8336")),T=s("99d9"),S=s("ce7e"),O=s("132d"),A=s("0789"),k=(s("60e8"),s("b64a")),$=s("163b"),P=s("c69d"),I=s("30d4"),V=s("b8d7"),W=s("98a1"),j=s("80d2"),N=s("d9bd");function G(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var L={name:"v-tooltip",mixins:[k["a"],$["a"],P["a"],I["a"],V["a"],W["a"]],props:{closeDelay:{type:[Number,String],default:200},debounce:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:200},tag:{type:String,default:"span"},transition:String,zIndex:{default:null}},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,s=t.content,i=!this.bottom&&!this.left&&!this.top&&!this.right,a=this.isAttached?e.offsetLeft:e.left,o=0;return this.top||this.bottom||i?o=a+e.width/2-s.width/2:(this.left||this.right)&&(o=a+(this.right?e.width:-s.width)+(this.right?10:-10)),this.nudgeLeft&&(o-=parseInt(this.nudgeLeft)),this.nudgeRight&&(o+=parseInt(this.nudgeRight)),this.calcXOverflow(o,this.dimensions.content.width)+"px"},calculatedTop:function(){var t=this.dimensions,e=t.activator,s=t.content,i=this.isAttached?e.offsetTop:e.top,a=0;return this.top||this.bottom?a=i+(this.bottom?e.height:-s.height)+(this.bottom?10:-10):(this.left||this.right)&&(a=i+e.height/2-s.height/2),this.nudgeTop&&(a-=parseInt(this.nudgeTop)),this.nudgeBottom&&(a+=parseInt(this.nudgeBottom)),this.calcYOverflow(a+this.pageYOffset)+"px"},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left}},computedTransition:function(){return this.transition?this.transition:this.top?"slide-y-reverse-transition":this.right?"slide-x-transition":this.bottom?"slide-y-transition":this.left?"slide-x-reverse-transition":""},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(j["c"])(this.maxWidth),minWidth:Object(j["c"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(j["m"])(this,"activator",!0)&&Object(N["a"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},genActivator:function(){var t=this,e=this.disabled?{}:{mouseenter:function(e){t.getActivator(e),t.runDelay("open")},mouseleave:function(e){t.getActivator(e),t.runDelay("close")}};if("scoped"===Object(j["m"])(this,"activator")){var s=this.$scopedSlots.activator({on:e});return this.activatorNode=s,s}return this.$createElement("span",{on:e,ref:"activator"},this.$slots.activator)}},render:function(t){var e,s=t("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(e={},G(e,this.contentClass,!0),G(e,"menuable__content__active",this.isActive),G(e,"v-tooltip__content--fixed",this.activatorFixed),e),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.showLazyContent(this.$slots.default));return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[t("transition",{props:{name:this.computedTransition}},[s]),this.genActivator()])}},M=Object(d["a"])(y,o,n,!1,null,"486eb6c0",null),E=M.exports;p()(M,{VAvatar:f["a"],VBtn:C["a"],VCardText:T["b"],VDivider:S["a"],VFlex:v["a"],VIcon:O["a"],VLayout:m["a"],VScrollXTransition:A["c"],VTooltip:L});var z={name:"Posts",components:{LoadingComponent:b["a"],Post:E},props:["filter","group_id"],data:function(){return{posts:null,loading:!0}},mounted:function(){this.fetchPosts()},methods:{fetchPosts:function(){var t=this;this.axios.get(this.api.ACTIONS.POSTS,{params:{page_size:100,page:1,filter:this.filter,group_id:this.group_id}}).then((function(e){t.posts=e.data.data.posts,t.loading=!1}))}}},B=z,D=Object(d["a"])(B,i,a,!1,null,"51c9d094",null);e["a"]=D.exports},fb7e:function(t,e,s){"use strict";s("3252")}}]);
//# sourceMappingURL=chunk-3eefda2c.bfe99822.js.map