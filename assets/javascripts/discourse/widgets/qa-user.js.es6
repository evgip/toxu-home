import { createWidget } from 'discourse/widgets/widget';
import RawHtml from 'discourse/widgets/raw-html';

export default createWidget('qa-user', {
  tagName: 'div.qa-user',
  buildKey: (attrs) => 'qa-user',

  html(attrs, state) {
    const { currentUser } = this;
    let contents = []
    
 var  username;

 var pathArray = window.location.pathname.split( '/' );
 username   = pathArray[2]; 
	
 var id;
 var granted_at;
 var userid;
 var name;
 var str;
 var ava;
 var avasm;
 var prbg;
 var trust_level;
 var badge_count;
 var profile_view_count; 
 var bio_excerpt;
 var yes;
    
    
  $.ajax({
  url: "/users/"+ username +".json", 
  dataType: 'json',
  async: false,
  success: function(data) {
  userid =  data.user.id;
  name =  data.user.name;
 
  trust_level = data.user.trust_level;
  badge_count = data.user.badge_count;
  profile_view_count = data.user.profile_view_count;
  bio_excerpt = data.user.bio_excerpt;
  prbg =  data.user.profile_background;
  str =  data.user.avatar_template;
  ava = str.replace('{size}', '120');	
  avasm = str.replace('{size}', '64');
  
  }
  });
 
if (userid) {   
	  
if (prbg) { 
  
 contents.push( new RawHtml({ html: `<div> <center>
 <h1 class="user">${username}</h1>
 <section class="user-main ember-view"> 
 <section style="background-image: url(${prbg})" class=" about has-background">
 <div class="card-content fonava">      
 <br><br> 
 </div> </section></section>
 <div class="avam"><img alt="${username} ${name}" src="${ava}" class="avam"></div>
 <h3 class="user">${name}</h3>
 <br></center></div>`}));  
  
} else {

 contents.push( new RawHtml({ html: `<div> <center>
 <h1 class="user">${username}</h1>
 <div class="avam-n"><img alt="${username} ${name}" src="${ava}" class="avam-n"></div>
 <h3 class="user">${name}</h3>
 <br></center></div>`}));  

}
 
if (bio_excerpt) { contents.push( new RawHtml({ html: `<div><center><blockquote> ${bio_excerpt}</blockquote></center></div>`}));  }
  
contents.push( new RawHtml({ html: `<div><center><div class="prof-glog-blog">

<div class="prof-blog">
<div class="prof-num">${trust_level}</div>
<div class="prof-txt">доверие</div>
</div>

<div class="prof-blog">
<div class="prof-num">${badge_count}</div>
<div class="prof-txt">наград</div>
</div>


<div class="prof-blog">
<div class="prof-num">${profile_view_count}</div>
<div class="prof-txt">просмотров</div>
</div>

</div><div class="bord new-str"></div></center></div>`})); 
  
  $.ajax({
  url: "/user-badges/"+ username +".json", 
  dataType: 'json',
  async: false,
  success: function(data) {
	
  var badges = data.user_badges;
   
  for (var t = 0; t < badges.length; t++) {
  
  id = badges[t].badge_id;
  granted_at = badges[t].granted_at;
  
  if ( id == 104) { yes = 1;
  contents.push( new RawHtml({ html: `<div class="bd"><center><br><h1 class="prof">Сертификат</h2>  
  <img src="https://toxu.ru/discobot/certificate.svg?date=${granted_at}&amp;user_id=${userid}" alt="Грамота" style="max-width:800px">
  </center></div>`})); 
   
   } else {   }
	  
}
}
});

if (yes) { } else {  contents.push( new RawHtml({ html: `<div class="bd"><br><br><center> <span class="no"> Сертификата нет</span> <br> <a href="https://toxu.ru/t/pochemu-mne-pishet-kakoj-to-bot/2294">Посмотреть</a>, как получить сертификат. </center></div>`}));  }

contents.push( new RawHtml({ html: `<div class="bd"> <center>
<br><br><a rel="nofollow" class="btn-primary create btn btn-icon-text ember-view" href="https://toxu.ru/u/${username}/summary">Посмотреть полный профиль</a> 
</center></div>`}));

	if (currentUser) { 
	const myid = currentUser.get('id');
	const myusername = currentUser.get('username');
	if (myid != userid) {
	contents.push( new RawHtml({ html: `<div class="bd"> <center>  
	<br><br><a rel="nofollow" class="btn-primary-my create btn btn-icon-text ember-view" href="https://toxu.ru/qa/${myusername}">Посмотреть свой профиль</a> 
	</center></div>`}));	
	}
	}  else {
	contents.push( new RawHtml({ html: `<div class="bd"> <center>  
	<br><br><a rel="nofollow" class="btn-primary-my create btn btn-icon-text ember-view" href="https://toxu.ru/login">Войти</a> 
	</center></div>`}));
	} 

contents.push( new RawHtml({ html: `<div class="bd"><br><br>
<a href="https://vk.com/share.php?url=https://toxu.ru/qa/${username}&title=${username}%20%D0%BD%D0%B0%20%D1%81%D0%B0%D0%B9%D1%82%D0%B5%20Toxu%20-%20%D0%BE%D0%B1%D0%BC%D0%B5%D0%BD%20%D0%B7%D0%BD%D0%B0%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D0%B8%20%D0%BE%D0%BF%D1%8B%D1%82%D0%BE%D0%BC&image=https://toxu.ru${avasm}"><i class="fa fa-vk" aria-hidden="true"></i></a>
</div>`}));	

} else { contents.push( new RawHtml({ html: `<div><br><br><center><h1 class="prof">Такого пользователя не существует</h1><br> <a href="https://toxu.ru">Перейди на центральную страницу сайта</a><center></div>`})); }		
	
return contents;

}
});