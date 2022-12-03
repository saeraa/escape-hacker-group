(()=>{"use strict";let e,t,n,a,i,l,s,c,o,d,r=[];function u(e){const t=(new Date).toLocaleDateString();l=parseInt(e.target.dataset.id),s=e.target.dataset.minparticipants,c=e.target.dataset.maxparticipants,d=e.target.dataset.title;let n=document.querySelector("body");o=document.createElement("div"),o.className="modal-div",o.innerHTML=`\n\t\t<div class="modalContents">\n        <div class="bookingStep1Content">\n        <form action="">\n        <h1>Book room "${d}" (step 1)</h1>\n        <h2>What date would you like to come?</h2>\n            <label class="modalInputLabels" for="date">Date</label>\n\t\t\t\n            <input id="date" class="input-field" type="date" name="date"\n            min="${t}">\n            <input id="firstButton" type="submit" value="Search available times" class="button primary open-modal-step-2">\n        </form>\n        </div>\n\t\t</div>\n    `,n.appendChild(o),document.querySelector(".open-modal-step-2").addEventListener("click",m),(document.querySelector(".modal-div").style.position="fixed")&&(document.querySelector("body").style.overflow="hidden")}function m(e){e.preventDefault();let t=!1,n=document.querySelector("#date");if(""==n.value){function a(){n.style.outline="none"}n.style.outline="solid 2px red",n.addEventListener("click",a)}""!==n.value&&(t=!0),t&&(i=document.querySelector("#date").value,async function(e,t){const n=await fetch(`https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${e}&challenge=${t}`);(await n.json()).slots.forEach((e=>{!function(e){let t=document.createElement("option");t.innerHTML=e,document.querySelector("#time").appendChild(t)}(e)}))}(i,l),function(e){e.preventDefault(),o.innerHTML=`\n\t\t<div class="modalContents">\n        <div class="bookingStep2Content">\n        <form action="">\n        <h1>Book room "${d}" (step 2)</h1>\n            <label class="modalInputLabels" for="name">Name</label>\n\t\t\t\t\t\t<input class="input-field" type="text" id="name" name="name">\n\t\t\t\t\t\t<label class="modalInputLabels" for="e-mail">E-mail</label>\n\t\t\t\t\t\t<input class="input-field" type="email" id="e-mail" name="e-mail">\n\t\t\t\t\t\t<label class="modalInputLabels" for="time">What time?</label>\n\t\t\t\t\t\t<select class="input-field" name="time" id="time">\n            </select>\n\t\t\t\t\t\t<label class="modalInputLabels" for="participants">How many participants?</label>\n\t\t\t\t\t\t<select class="input-field" name="participants" id="participants">\n            </select>\n            <input id="secondButton" class="button primary open-modal-step-3" type="submit" value="Submit booking">\n        </form>\n        </div>\n\t\t</div>\n    `,function(e,t){let n=t-e;for(let t=0;t<=n;t++)a(),e++;function a(){let t=document.createElement("option");t.innerHTML=`${e} participants`,document.querySelector("#participants").appendChild(t)}}(s,c),document.querySelector(".open-modal-step-3").addEventListener("click",p)}(e))}function p(s){s.preventDefault();let c=!1,d=document.querySelector("#name"),r=document.querySelector("#e-mail");if(""==d.value){function u(){d.style.outline="none"}d.style.outline="solid 2px red",d.addEventListener("click",u)}else if(""==r.value){function m(){r.style.outline="none"}r.style.outline="solid 2px red",r.addEventListener("click",m)}else c=!0;c&&(e=document.querySelector("#name").value,t=document.querySelector("#e-mail").value,n=document.querySelector("#time").value,a=parseInt(document.querySelector("#participants").value),async function(){const s=await fetch("https://lernia-sjj-assignments.vercel.app/api/booking/reservations",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({challenge:l,name:e,email:t,date:i,time:n,participants:a})});await s.json()}(),function(e){e.preventDefault(),o.innerHTML='\n\t<div class="modalContents">\n\t<div class="bookingStep3Content">\n    <h1>Thank you!</h1>\n    <a href="challenges.html">Back to challenges</a>\n    </div>\n\t</div>\n'}(s))}function h(e,t){if(t.innerHTML="",0!=e.length)for(let n=0;n<e.length;n++){const{id:a,type:i,rating:l,title:s,description:c,minParticipants:o,maxParticipants:d,image:r}=e[n];let m=document.createElement("li");m.classList.add("challenge-item");let p=document.createElement("img");p.classList.add("challenge-image"),p.src=r,m.append(p);let h=document.createElement("img");h.classList.add("room-image"),h.src="onsite"==i?"static/iconOnsite.svg":"static/iconOnline.svg",m.append(h);let f=document.createElement("h3");f.classList.add("challenge-title"),f.textContent=s,m.appendChild(f);let v=document.createElement("ul");v.classList.add("rating");let y=document.createElement("li");y.classList.add("rating-star"),v.appendChild(y);let g=document.createElement("li");g.classList.add("rating-star"),v.appendChild(g);let L=document.createElement("li");L.classList.add("rating-star"),v.appendChild(L);let b=document.createElement("li");b.classList.add("rating-star"),v.appendChild(b);let E=document.createElement("li");E.classList.add("rating-star"),v.appendChild(E),l<1?y.classList.add("rating-star"):1==l||l<2?y.classList.add("active"):2==l||l<3?(y.classList.add("active"),g.classList.add("active")):3==l||l<4?(y.classList.add("active"),g.classList.add("active"),L.classList.add("active")):4==l||l<5?(y.classList.add("active"),g.classList.add("active"),L.classList.add("active"),b.classList.add("active")):(y.classList.add("active"),g.classList.add("active"),L.classList.add("active"),b.classList.add("active"),E.classList.add("active")),m.appendChild(v);let k=document.createElement("small");k.classList.add("challenge-meta"),k.innerHTML=`${o} - ${d} participants`,m.appendChild(k);let S=document.createElement("p");S.classList.add("challenge-description"),S.textContent=c,m.appendChild(S);let w=document.createElement("button");w.classList.add("btnBook","button","primary"),w.setAttribute("data-id",a),w.setAttribute("data-minparticipants",o),w.setAttribute("data-maxparticipants",d),w.setAttribute("data-title",s),w.textContent="onsite"==i?"Book this room":"Take challenge online",m.appendChild(w),w.addEventListener("click",u),t.appendChild(m)}else t.innerHTML="<p class='filter-error'>No matching challenges.</p>"}function f(e,t){return!(t.includes("tags:")&&!e.labels.includes(t.substring(5)))}function v(e,t){const n=e.title.concat(" ",e.description).toLowerCase().split(/[ ,]+/);return!!t.toLowerCase().split(/[ ,]+/).every((e=>n.find((t=>{if(t.includes(e))return!0}))))}document.querySelector(".main-nav-toggle").addEventListener("click",(()=>{document.querySelector(".main-nav").classList.toggle("open")})),document.querySelectorAll(".main-menu-item").forEach((e=>{e.addEventListener("click",(()=>{document.querySelector(".main-nav").classList.remove("open")}))})),document.querySelector("h1").addEventListener("click",(()=>{window.location.href="index.html"}));const y=document.querySelector(".challenge-list"),g=document.querySelector("#btnFilterChallenges"),L=document.querySelector(".filter-close");function b(){E.classList.toggle("open"),E.classList.contains("open")?g.style.display="none":g.style.display="block"}g.addEventListener("click",b),L.addEventListener("click",b);const E=document.querySelector(".filter-form"),k=document.querySelector("input[type='search']");document.querySelector(".filter-clear").addEventListener("click",(function(){E.reset(),h(w,y)})),E.addEventListener("submit",(function(e){e.preventDefault()})),E.addEventListener("change",C),k.addEventListener("keyup",C);let S,w=[];function q(){const e=document.querySelectorAll("input[type=checkbox]");if(window.location.hash){const t=window.location.hash;let n=new Event("change");t.includes("all")?(E.reset(),E.dispatchEvent(n)):t.includes("online")?setTimeout((()=>{e[1].checked&&(e[1].checked=!1),e[0].checked=!0,E.dispatchEvent(n)}),200):t.includes("onsite")&&setTimeout((()=>{e[0].checked&&(e[0].checked=!1),e[1].checked=!0,E.dispatchEvent(n)}),200)}}function C(e){!function(){const e=document.querySelectorAll("input[type=radio]");e.forEach((e=>{e.disabled=!1})),S=null,e.forEach((e=>{e.name.includes("min")&&e.checked&&(S=e.value),e.name.includes("max")&&+e.value<+S&&(e.disabled=!0),e.name.includes("max")&&+e.value<+S&&(e.checked=!1)}))}();let t=[];const n=function(){const e=new FormData(E);let t={};for(const[n,a]of e)""!==a&&(t[n]=a);return t}();w.forEach((e=>{let a=!0,i=!0,l=!0,s=!0;i=function(e,t){return!(t.hasOwnProperty("rating:min")&&+e.rating<+t["rating:min"]||t.hasOwnProperty("rating:max")&&+e.rating>+t["rating:max"])}(e,n),l=function(e,t){return!((!t.hasOwnProperty("type:onsite")||!t.hasOwnProperty("type:online"))&&(t.hasOwnProperty("type:online")&&"online"!=e.type||t.hasOwnProperty("type:onsite")&&"onsite"!=e.type))}(e,n);for(const t in n){if(s=f(e,t),!s)break;if("search"==t&&(a=v(e,n[t]),!a))break}l&&s&&a&&i&&t.push(e)})),h(t,y)}window.addEventListener("hashchange",q),window.addEventListener("load",(async function(){q();let e=new Set;w.length=0,w=await async function(){const e=await fetch("https://lernia-sjj-assignments.vercel.app/api/challenges");return(await e.json()).challenges.forEach((e=>{r.push(e)})),r}(),w.forEach((t=>{t.labels.forEach((t=>{e.add(t)}))})),h(w,y),function(e){let t="";e.forEach((e=>{t+=`\n\t\t<input type="checkbox" name="tags:${e}" id="tags:${e}">\n\t\t<label for="tags:${e}">${e}</label>\n\t\t`})),document.querySelector("#tags").innerHTML=t}(e)}))})();