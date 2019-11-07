    <template>
        <div class="Main">
          <div class="Img1"></div>
          <div class="Img2"></div>
          <div class="Img3"></div>
          <div class="Img4"></div>
          <div class="Img5"></div>
          <div class="Img6"></div>
          <div class="Img7"></div>
          <div class="Img8"></div>
          <div class="Img9"></div>
          <div class="Img10"></div>
          <div class="Img11"></div>
          <div class="Img12"></div>
          <div class="Img13"></div>
          <div class="Img14"></div>
          <div class="bottom">
            <div class="curriculum"> 
              <div>
                <span></span>
                <span>鲸小爱口语课</span>
              </div>
              <div>
                <span></span>
                <span>雅思备考计划</span>
              </div>
              <div>
                <span></span>
                <span>雅思模考</span>
              </div>
            </div>
            <div class="spell" @click="handlerspell">去支付</div>
          </div>
        </div>
    </template>
    <script>
        import "./index.css"
        export default {
          data() {
            return {
              collapsed: false,
              platform:"",
            }
          },
          mounted(){
        
          },
          methods:{
            handlerspell(){
              this.$router.push("/spell")
            }
          },

        }
          
          
        
    </script>



