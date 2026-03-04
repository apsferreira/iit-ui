import{j as e}from"./jsx-runtime-Z5uAzocK.js";import{r as q}from"./index-pP6CS22B.js";import{c as $}from"./index-DglmNpsn.js";import{c as T}from"./lib-BLSKlp9E.js";import"./_commonjsHelpers-Cpj98o6Y.js";const V=$("animate-pulse bg-[#1E1E28]",{variants:{variant:{block:"rounded-lg",text:"rounded h-4",circle:"rounded-full"}},defaultVariants:{variant:"block"}}),t=q.forwardRef(({className:a,variant:y,width:r,height:i,style:D,...E},C)=>e.jsx("div",{ref:C,"aria-hidden":"true",className:T(V({variant:y}),a),style:{width:r!==void 0?typeof r=="number"?`${r}px`:r:void 0,height:i!==void 0?typeof i=="number"?`${i}px`:i:void 0,...D},...E}));t.displayName="Skeleton";t.__docgenInfo={description:"",methods:[],displayName:"Skeleton",props:{width:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},height:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""}},composes:["VariantProps"]};const F={title:"Components/Skeleton",component:t,tags:["autodocs"],argTypes:{variant:{control:"select",options:["block","text","circle"],description:"Formato do skeleton",table:{defaultValue:{summary:"block"}}},width:{control:"text",description:"Largura (número = px, string = qualquer unidade CSS)"},height:{control:"text",description:"Altura (número = px, string = qualquer unidade CSS)"}},args:{variant:"block",width:200,height:80}},n={args:{variant:"block",width:240,height:120}},s={args:{variant:"text",width:"80%"},decorators:[a=>e.jsx("div",{className:"w-80",children:e.jsx(a,{})})]},o={args:{variant:"circle",width:64,height:64}},l={render:()=>e.jsxs("div",{className:"w-80 bg-white border border-[#D0DDE6] rounded-xl p-5 flex flex-col gap-4",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(t,{variant:"circle",width:48,height:48}),e.jsxs("div",{className:"flex flex-col gap-2 flex-1",children:[e.jsx(t,{variant:"text",width:"60%"}),e.jsx(t,{variant:"text",width:"40%"})]})]}),e.jsx(t,{variant:"block",width:"100%",height:140}),e.jsxs("div",{className:"flex flex-col gap-1.5",children:[e.jsx(t,{variant:"text",width:"100%"}),e.jsx(t,{variant:"text",width:"80%"}),e.jsx(t,{variant:"text",width:"60%"})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(t,{variant:"block",width:80,height:32}),e.jsx(t,{variant:"block",width:100,height:32})]})]})},d={render:()=>e.jsx("div",{className:"w-80 flex flex-col gap-3",children:[1,2,3,4].map(a=>e.jsxs("div",{className:"bg-white border border-[#D0DDE6] rounded-lg p-4 flex items-center gap-3",children:[e.jsx(t,{variant:"circle",width:40,height:40}),e.jsxs("div",{className:"flex flex-col gap-1.5 flex-1",children:[e.jsx(t,{variant:"text",width:`${50+a*10}%`}),e.jsx(t,{variant:"text",width:`${30+a*8}%`})]}),e.jsx(t,{variant:"block",width:60,height:24})]},a))})};var c,x,h;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    variant: 'block',
    width: 240,
    height: 120
  }
}`,...(h=(x=n.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var m,p,v;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    variant: 'text',
    width: '80%'
  },
  decorators: [Story => <div className="w-80">
        <Story />
      </div>]
}`,...(v=(p=s.parameters)==null?void 0:p.docs)==null?void 0:v.source}}};var g,u,w;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: 'circle',
    width: 64,
    height: 64
  }
}`,...(w=(u=o.parameters)==null?void 0:u.docs)==null?void 0:w.source}}};var f,k,b;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div className="w-80 bg-white border border-[#D0DDE6] rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" width={48} height={48} />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="block" width="100%" height={140} />
      <div className="flex flex-col gap-1.5">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </div>
      <div className="flex gap-2">
        <Skeleton variant="block" width={80} height={32} />
        <Skeleton variant="block" width={100} height={32} />
      </div>
    </div>
}`,...(b=(k=l.parameters)==null?void 0:k.docs)==null?void 0:b.source}}};var S,j,N;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="w-80 flex flex-col gap-3">
      {[1, 2, 3, 4].map(i => <div key={i} className="bg-white border border-[#D0DDE6] rounded-lg p-4 flex items-center gap-3">
          <Skeleton variant="circle" width={40} height={40} />
          <div className="flex flex-col gap-1.5 flex-1">
            <Skeleton variant="text" width={\`\${50 + i * 10}%\`} />
            <Skeleton variant="text" width={\`\${30 + i * 8}%\`} />
          </div>
          <Skeleton variant="block" width={60} height={24} />
        </div>)}
    </div>
}`,...(N=(j=d.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};const I=["Block","Text","Circle","CardSkeleton","ListSkeleton"];export{n as Block,l as CardSkeleton,o as Circle,d as ListSkeleton,s as Text,I as __namedExportsOrder,F as default};
