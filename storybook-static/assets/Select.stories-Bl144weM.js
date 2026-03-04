import{j as e}from"./jsx-runtime-Z5uAzocK.js";import{r as h}from"./index-pP6CS22B.js";import{c as k}from"./lib-BLSKlp9E.js";import"./_commonjsHelpers-Cpj98o6Y.js";const p=h.forwardRef(({className:c,label:u,helperText:d,error:r,options:m,placeholder:b,id:F,children:G,...O},W)=>{const a=F??h.useId(),x=!!r;return e.jsxs("div",{className:"flex flex-col gap-1.5",children:[u&&e.jsx("label",{htmlFor:a,className:"text-sm font-medium text-[#0D1B26]",children:u}),e.jsxs("div",{className:"relative",children:[e.jsxs("select",{ref:W,id:a,"aria-invalid":x,"aria-describedby":r?`${a}-error`:d?`${a}-helper`:void 0,className:k("w-full appearance-none rounded-lg border bg-white px-3 py-2 pr-9 text-sm text-[#0D1B26]","transition-colors duration-150","focus:outline-none focus:ring-2 focus:ring-[#0097D6] focus:ring-offset-1 focus:ring-offset-white","disabled:opacity-40 disabled:cursor-not-allowed",x?"border-red-500/60 focus:ring-red-500":"border-[#D0DDE6] focus:border-[#0097D6]",c),...O,children:[b&&e.jsx("option",{value:"",disabled:!0,children:b}),m?m.map(o=>e.jsx("option",{value:o.value,disabled:o.disabled,children:o.label},o.value)):G]}),e.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#8A9FAF]",children:e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":"true",children:e.jsx("polyline",{points:"6 9 12 15 18 9"})})})]}),r&&e.jsx("p",{id:`${a}-error`,role:"alert",className:"text-xs text-red-500",children:r}),!r&&d&&e.jsx("p",{id:`${a}-helper`,className:"text-xs text-[#8A9FAF]",children:d})]})});p.displayName="Select";p.__docgenInfo={description:"",methods:[],displayName:"Select",props:{label:{required:!1,tsType:{name:"string"},description:""},helperText:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},options:{required:!1,tsType:{name:"Array",elements:[{name:"SelectOption"}],raw:"SelectOption[]"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""}}};const A=[{value:"BA",label:"Bahia"},{value:"SP",label:"São Paulo"},{value:"RJ",label:"Rio de Janeiro"},{value:"MG",label:"Minas Gerais"},{value:"RS",label:"Rio Grande do Sul"},{value:"PR",label:"Paraná"},{value:"SC",label:"Santa Catarina"},{value:"PE",label:"Pernambuco"},{value:"CE",label:"Ceará"},{value:"GO",label:"Goiás"}],I={title:"Components/Select",component:p,tags:["autodocs"],argTypes:{label:{control:"text",description:"Label do select"},placeholder:{control:"text",description:"Opção inicial desabilitada (placeholder)"},error:{control:"text",description:"Mensagem de erro"},helperText:{control:"text",description:"Texto auxiliar"},disabled:{control:"boolean",description:"Desabilita o select",table:{defaultValue:{summary:"false"}}}},args:{options:[{value:"react",label:"React"},{value:"vue",label:"Vue.js"},{value:"svelte",label:"Svelte"}]},decorators:[c=>e.jsx("div",{className:"w-80",children:e.jsx(c,{})})]},s={},l={args:{label:"Framework",placeholder:"Selecione um framework..."}},t={args:{label:"Categoria",placeholder:"Selecione...",error:"Selecione uma categoria"}},i={args:{label:"Plano (desabilitado)",options:[{value:"free",label:"Gratuito"},{value:"pro",label:"Pro"}],disabled:!0}},n={args:{label:"Estado",placeholder:"Selecione um estado...",options:A,helperText:"Selecione o estado de residência"}};var f,g,v;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:"{}",...(v=(g=s.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var S,y,j;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Framework',
    placeholder: 'Selecione um framework...'
  }
}`,...(j=(y=l.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var w,D,E;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'Categoria',
    placeholder: 'Selecione...',
    error: 'Selecione uma categoria'
  }
}`,...(E=(D=t.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var N,P,T;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    label: 'Plano (desabilitado)',
    options: [{
      value: 'free',
      label: 'Gratuito'
    }, {
      value: 'pro',
      label: 'Pro'
    }],
    disabled: true
  }
}`,...(T=(P=i.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var B,C,R;n.parameters={...n.parameters,docs:{...(B=n.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    label: 'Estado',
    placeholder: 'Selecione um estado...',
    options: estadosBrasil,
    helperText: 'Selecione o estado de residência'
  }
}`,...(R=(C=n.parameters)==null?void 0:C.docs)==null?void 0:R.source}}};const L=["Default","WithLabel","WithError","Disabled","WithManyOptions"];export{s as Default,i as Disabled,t as WithError,l as WithLabel,n as WithManyOptions,L as __namedExportsOrder,I as default};
