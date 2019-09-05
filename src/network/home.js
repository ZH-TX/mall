import axios from './axios'

export const BANNER = 'banner'
export const RECOMMEND = 'recommend'

export function getHomeMultidata() {
  return axios({
    url: ''
  })
}

export function getHomeData( page) {
  return axios({
    url: '/api?key_word=女装&app_key=LqZSB5E1&page=xxx&v=1.0&cat=2',
    params:{
          s_type:1,
         
         
          page,
          
      
      
        }
  })
}

// axios.get("/api?s_type=1&key_word=女装&app_key=LqZSB5E1&page=xxx&v=1.0&cat=2",{
//   params:{
//     s_type:1,
//     key_word:"搜索值" ,
//     app_key:LqZSB5E1,
//     page:num2,
//     v:num3,
//     cat:num4,


//   }
// })