    <template>
        <div class="GoundMain" >
            <div class="HeadImg" >
              <div class="HeadImgText">雅思口语机经训练营</div>
              <div class="HeadImgWords" >AI+真人纠音师共同帮你纠音</div>
              <div class="HeadStudy" >
                <div>最新口语机经</div>
                <div>专业名师纠错</div>
              </div>
              <div class="HeadInteraction">AI精准打分</div>
            </div>
            <!-- <div class="ash"></div> -->
            <div class="GroundSelectK" >
                  为什么选择这个课程
            </div>
            <div class="GroundEnjoyK">
              <p></p>
              <p>尊享服务</p>
              <p></p>
            </div>
            <div class="GroundProcess">
              <div class="GroundProcessO">
                <div class="GroundProcessOLeft" >
                  <div></div>
                  <p>提供
                    <span>“讲、</span>
                    <span>学、</span>
                    <span>练、</span>
                    <span>评”</span>
                   系统化机经学习方案
                  </p>
                </div>
                <div class="GroundProcessORight" >
                  <div></div>
                   <p><span>AI+真人纠音师</span>
                  共同帮助您纠正机经的回答
                  </p>
                </div>
              </div>
              <div class="GroundProcessT">
                <div class="GroundProcessTLeft" >
                  <div></div>
                  <p><span>由浅入深</span>
                  详解机经解题思路，深度练习，积累语料
                  </p>
                </div>
                <div class="GroundProcessTRight" >
                  <div></div>
                  <p>精选高频
                    <span>“人、</span>
                    <span>事、</span>
                    <span>物、</span>
                    <span>地”</span>
                    机经话题，外教语音示范
                  </p>
                </div>
              </div>
            </div>
            <div class="GroundSelectC" >
                <div>课程可以帮您解决什么问题？</div>
                <div>
                    <div>1</div>
                    <div>专业纠音老师帮您纠正机经答题语音语调</div>
                </div>
                <div>
                    <div>2</div>
                    <div>帮您解答机经的真正解题思路与套路</div>
                </div>
                <div>
                    <div>3</div>
                    <div>试用当季高频机经，强化答题技巧</div>
                </div>
            </div>

            <div class="GroundService" >
                  <div>课程服务人群</div>
                  <div class="GroundServiceEs" >
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
            </div>
            <div class="Coursecontent" >
                课程内容
            </div>
            <div class="CoursecontentText" >
                当季机经话题/详细视频讲解/真人题目解析
            </div>
            <div class="Img1" ></div>
            <div class="Img2" ></div>
            <div class="Img3" ></div>
            <div class="Classprocess">上课流程</div>
            <div class="ClassImg"></div>
            <div class="ashsc" ></div>
            <div class="GroundBottoms" >
              <div class="GroundBottomTimes" >
                  <span>拼单仅剩</span>
                  <span>{{this.ss}}</span>
              </div>
              <div class="GroundBottomSpellss" @click="handlerClickPersonal" >参与拼单</div>
            </div>
        </div>
    </template>
    <script>
        import "./index.css"
        import { ServerIP, H5IP, isWeiXin, GetQueryString } from '../../common/common';
        export default {
          data() {
            return {
              collapsed: false,
              assemblyId:"",//拼单ID
              promoterUserId:"",//队长ID
              startTime:"",//拼单开始时间
              ss:"",//拼单有效时间
              curriculumId:"2",//课程ID
              type:"",//课程类型
              name:"",//课程名称
              price:"39",//价格
              assemblePrice:"",//拼单价格
              assemblySize:"",//拼团规模
              userId:"",//用户id
              avatar:"",//用户头像
              nickname:"",//用户昵称
              startDate:"",//开始时间
              endDate:"",//结束时间
              texts:"",
            }
          },
          created(){

              this.assemblyId=GetQueryString("assemblyId")
              let data = new FormData();
              fetch(ServerIP+"v2/curriculums/assemblyInfo/"+this.assemblyId,{
                  method: 'GET',
                  mode: "cors",
              }).then((res)=>{
                  return res.json();
              })
              .then((res)=>{
                    this.startDate=res.data.curriculumInfo.startDate;
                    this.startTime=res.data.startTime;
                    this.assemblePrice=res.data.curriculumInfo.assemblePrice;
                    this.price=res.data.curriculumInfo.price;
                    this.assemblySize=res.data.curriculumInfo.assemblySize
                    this.assemblyLength=res.data.membersInfo.length
                    this.endTime = new Date(Date.parse(res.data.startTime.replace(/-/g,'/'))).getTime();
                    this.endTime = this.endTime+res.data.assemblyInvalidTimelong;
                    this.interval = setInterval(() => {
                    let newData = new Date(); //开始时间
                    let T =  this.endTime-newData.getTime();
                    if ( T < 0 ) {
                        this.ss="拼单结束"
                        clearInterval(this.interval)
                    }else{
                    let d=Math.floor(T/1000/60/60/24);
                    let h=Math.floor(T/1000/60/60%24);
                    let m=Math.floor(T/1000/60%60);
                    let s=Math.floor(T/1000%60);
                    if(h<10){
                      h="0"+h;
                    }
                    if(m<10){
                      m="0"+m;
                    }
                    if(s<10){
                      s="0"+s
                    }
                    this.ss = h+":"+m+":"+s+""
                    }
                }, 1000);
              })
          },
          methods:{
              handlerClickPersonal(){
                if(localStorage.getItem("token")!=null){
                      if(isWeiXin()){
                       var uurrll = H5IP+"payment?type=3&price="+this.assemblePrice+"&assemblyId="+GetQueryString("assemblyId")+"&curriculumId="+localStorage.getItem("curriculumId")
                       uurrll = encodeURIComponent(uurrll)
                       location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx406146b030189d06&redirect_uri="+uurrll+"&response_type=code&scope=snsapi_base&#wechat_redirect");    
                  }else{
         
                      window.location.href=H5IP + "payment?type=3&price="+this.assemblePrice+"&assemblyId="+this.assemblyId+"&curriculumId="+localStorage.getItem("curriculumId")
                   }
                  }else{
                       window.location.href=H5IP + "login?type=3&price="+this.assemblePrice+"&assemblyId="+this.assemblyId+"&curriculumId="+localStorage.getItem("curriculumId")
                  }
              },
          },
        }
    </script>