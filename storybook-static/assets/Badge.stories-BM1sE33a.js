import{j as r}from"./jsx-runtime-Z5uAzocK.js";import{B as a}from"./Badge-DZzX2j3c.js";import"./index-pP6CS22B.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-DglmNpsn.js";import"./lib-BLSKlp9E.js";const R={title:"Components/Badge",component:a,tags:["autodocs"],argTypes:{variant:{control:"select",options:["neutral","success","warning","error","info","brand"],description:"Estilo semântico do badge",table:{defaultValue:{summary:"neutral"}}},dot:{control:"boolean",description:"Exibe ponto indicador colorido",table:{defaultValue:{summary:"false"}}},children:{control:"text",description:"Texto do badge"}},args:{children:"Badge",variant:"neutral",dot:!1}},e={args:{variant:"neutral",children:"Neutral"}},n={args:{variant:"success",children:"Concluído"}},s={args:{variant:"warning",children:"Atenção"}},t={args:{variant:"error",children:"Erro"}},o={args:{variant:"info",children:"Informação"}},i={args:{variant:"brand",children:"IIT"}},d={args:{variant:"success",dot:!0,children:"Online"}},c={render:()=>r.jsxs("div",{className:"flex flex-col gap-6",children:[r.jsxs("div",{children:[r.jsx("p",{className:"text-xs font-semibold text-[#8A9FAF] uppercase tracking-widest mb-3",children:"Sem dot"}),r.jsxs("div",{className:"flex flex-wrap gap-2",children:[r.jsx(a,{variant:"neutral",children:"Neutral"}),r.jsx(a,{variant:"success",children:"Success"}),r.jsx(a,{variant:"warning",children:"Warning"}),r.jsx(a,{variant:"error",children:"Error"}),r.jsx(a,{variant:"info",children:"Info"}),r.jsx(a,{variant:"brand",children:"Brand"})]})]}),r.jsxs("div",{children:[r.jsx("p",{className:"text-xs font-semibold text-[#8A9FAF] uppercase tracking-widest mb-3",children:"Com dot"}),r.jsxs("div",{className:"flex flex-wrap gap-2",children:[r.jsx(a,{variant:"neutral",dot:!0,children:"Inativo"}),r.jsx(a,{variant:"success",dot:!0,children:"Online"}),r.jsx(a,{variant:"warning",dot:!0,children:"Atenção"}),r.jsx(a,{variant:"error",dot:!0,children:"Offline"}),r.jsx(a,{variant:"info",dot:!0,children:"Sincronizando"}),r.jsx(a,{variant:"brand",dot:!0,children:"IIT Live"})]})]})]})};var l,g,u;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    variant: 'neutral',
    children: 'Neutral'
  }
}`,...(u=(g=e.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var m,p,v;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    children: 'Concluído'
  }
}`,...(v=(p=n.parameters)==null?void 0:p.docs)==null?void 0:v.source}}};var x,f,h;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    children: 'Atenção'
  }
}`,...(h=(f=s.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var B,b,j;t.parameters={...t.parameters,docs:{...(B=t.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    children: 'Erro'
  }
}`,...(j=(b=t.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};var I,N,S;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    children: 'Informação'
  }
}`,...(S=(N=o.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};var w,A,E;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    variant: 'brand',
    children: 'IIT'
  }
}`,...(E=(A=i.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var F,O,T;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    dot: true,
    children: 'Online'
  }
}`,...(T=(O=d.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var W,C,k;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold text-[#8A9FAF] uppercase tracking-widest mb-3">Sem dot</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="brand">Brand</Badge>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-[#8A9FAF] uppercase tracking-widest mb-3">Com dot</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="neutral" dot>Inativo</Badge>
          <Badge variant="success" dot>Online</Badge>
          <Badge variant="warning" dot>Atenção</Badge>
          <Badge variant="error" dot>Offline</Badge>
          <Badge variant="info" dot>Sincronizando</Badge>
          <Badge variant="brand" dot>IIT Live</Badge>
        </div>
      </div>
    </div>
}`,...(k=(C=c.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};const q=["Neutral","Success","Warning","Error","Info","Brand","WithDot","AllVariants"];export{c as AllVariants,i as Brand,t as Error,o as Info,e as Neutral,n as Success,s as Warning,d as WithDot,q as __namedExportsOrder,R as default};
