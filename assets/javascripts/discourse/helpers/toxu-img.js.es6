import { registerUnbound } from "discourse-common/lib/helpers";
import { isRTL } from "discourse/lib/text-direction";

function setDir(text) {
  let content;
  var slug = text.category.slug;
  console.log(text);
  
  if (text) { console.log('11111111'); } else { console.log('222222');   }
  
  
if (slug == 'blog') { 
   
  return `<span class="timg"><img alt="блоги" src="/uploads/default/original/2X/c/c73cd3461513cda6f28f8d81fc4f0bbcd50601c4.jpeg"></span>`;
  
 } else { 
   
  return `<span></span>`;
 
 }
    
   
  return content;
}

export default registerUnbound("toxu-img", function(str) {
  return new Handlebars.SafeString(setDir(str));
});
