'use client';
import {createPortal} from 'react-dom';
import React,{useEffect,useRef,useState} from 'react';
const bones=[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]];
const ease=t=>1-Math.pow(1-t,4);
export default function PaperHand({hand,cursor,pinch=false}){
 const homes=useRef(null),seed=useRef(null),target=useRef(null),motion=useRef({points:[],shown:false}),[frame,setFrame]=useState(null);
 useEffect(()=>{
  const host=homes.current,hero=host.closest('.hero');if(!hero)return;
  // Sample once per mount. Reuse the samples when the responsive layout changes.
  const random=Array.from({length:6000},()=>[Math.random(),Math.random()]);
  const place=()=>{const box=hero.getBoundingClientRect();
   const blocked=[...hero.querySelectorAll('.hero-title,.hero-top,.hero-bottom,.walking-frame,.sketch-sticker'),...document.querySelectorAll('.hand-control-open')].map(el=>el.getBoundingClientRect());
   const points=[];for(const [u,v] of random){const x=12+u*(box.width-24),y=16+v*(box.height-32);
    if(blocked.some(b=>x+box.left>b.left-10&&x+box.left<b.right+10&&y+box.top>b.top-10&&y+box.top<b.bottom+10))continue;
    if(points.some(p=>Math.hypot(p.x-x,p.y-y)<24))continue;
    points.push({x,y});if(points.length===21)break;
   }
   [...host.children].forEach((el,i)=>{const p=points[i];el.style.left=(p?.x||12)+'px';el.style.top=(p?.y||16)+'px'});
  };
  place();const observer=new ResizeObserver(place);observer.observe(hero);hero.querySelectorAll('.hero-title,.walking-frame').forEach(el=>observer.observe(el));document.fonts?.ready.then(place);
  return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  if(!hand){target.current=null;return}
  const xs=hand.map(p=>p.x),ys=hand.map(p=>p.y),span=Math.max(Math.max(...xs)-Math.min(...xs),Math.max(...ys)-Math.min(...ys),.15);
  const anchor=cursor||{x:(1-hand[8].x)*innerWidth,y:hand[8].y*innerHeight};
  target.current=hand.map(p=>({x:anchor.x+(hand[8].x-p.x)*82/span,y:anchor.y+(p.y-hand[8].y)*82/span}));
 },[hand,cursor]);
 useEffect(()=>{let raf;const r=motion.current,reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const scatter=()=>[...homes.current.querySelectorAll('span')].map(el=>{const b=el.getBoundingClientRect();return{x:b.left+b.width/2,y:b.top+b.height/2}});
  const initialise=e=>{if(e.detail)seed.current=e.detail};window.addEventListener('portfolio-hand-seed',initialise);
  function tick(now){const t=target.current;
   if(seed.current){r.points=seed.current;r.from=seed.current;r.start=now;r.scatter=scatter();r.shown=false;seed.current=null;r.ambient=true}

   if(t&&!r.shown){r.shown=true;r.start=now;r.from=r.ambient?scatter():(r.points.length?r.points:scatter());r.scatter=null}
   if(!t&&r.shown){r.shown=false;r.start=now;r.from=r.points;r.scatter=scatter()}
   if(t){const elapsed=now-r.start; r.points=t.map((p,i)=>{const k=reduced?1:ease(Math.max(0,Math.min(1,(elapsed-i*12)/650)));return{x:r.from[i].x+(p.x-r.from[i].x)*k,y:r.from[i].y+(p.y-r.from[i].y)*k}});setFrame({points:r.points,opacity:1,ambient:false,bones:reduced?1:Math.max(0,Math.min(1,(elapsed-350)/500))})}
   else if(r.scatter&&r.points.length){r.scatter=scatter();const k=reduced?1:Math.min(1,(now-r.start)/500);r.points=r.scatter.map((p,i)=>({x:r.from[i].x+(p.x-r.from[i].x)*ease(k),y:r.from[i].y+(p.y-r.from[i].y)*ease(k)}));setFrame(k===1?null:{points:r.points,opacity:1,ambient:false,bones:0});if(k===1){r.scatter=null;r.ambient=true}}
   raf=requestAnimationFrame(tick)
  }raf=requestAnimationFrame(tick);return()=>{cancelAnimationFrame(raf);window.removeEventListener('portfolio-hand-seed',initialise)}
 },[]);
 return <><div className={'hand-dot-homes '+(frame?'away':'')} ref={homes} aria-hidden="true">{Array.from({length:21},(_,i)=><span key={i} className={i===8?'tip':''}/>)}</div>{frame&&createPortal(<svg className={'hand-paper-cursor '+(pinch?'pinching':'')+(frame.ambient?' ambient':'')} width="100%" height="100%" aria-hidden="true" style={{opacity:frame.opacity}}><g opacity={frame.bones}>{bones.map(([a,b],i)=><line key={i} x1={frame.points[a].x} y1={frame.points[a].y} x2={frame.points[b].x} y2={frame.points[b].y}/>)}</g>{frame.points.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={i===8?3.4:2.2} className={i===8?'tip':''}/>)}</svg>,document.body)}</>
}
