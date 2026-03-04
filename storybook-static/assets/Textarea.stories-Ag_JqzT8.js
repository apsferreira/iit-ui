import{j as e}from"./jsx-runtime-Z5uAzocK.js";import{r as x}from"./index-pP6CS22B.js";import{c as w}from"./lib-BLSKlp9E.js";import"./_commonjsHelpers-Cpj98o6Y.js";const b=x.forwardRef(({className:d,label:h,helperText:u,error:a,showCount:_,maxLength:s,id:R,value:g,defaultValue:f,onChange:p,...k},z)=>{const r=R??x.useId(),v=!!a,[D,P]=x.useState(()=>String(g??f??"").length),G=m=>{P(m.target.value.length),p==null||p(m)};return e.jsxs("div",{className:"flex flex-col gap-1.5",children:[h&&e.jsx("label",{htmlFor:r,className:"text-sm font-medium text-[#0D1B26]",children:h}),e.jsx("textarea",{ref:z,id:r,"aria-invalid":v,"aria-describedby":a?`${r}-error`:u?`${r}-helper`:void 0,maxLength:s,value:g,defaultValue:f,onChange:G,className:w("w-full rounded-lg border bg-white px-3 py-2 text-sm text-[#0D1B26]","placeholder:text-[#8A9FAF] resize-y min-h-[80px]","transition-colors duration-150","focus:outline-none focus:ring-2 focus:ring-[#0097D6] focus:ring-offset-1 focus:ring-offset-white","disabled:opacity-40 disabled:cursor-not-allowed",v?"border-red-500/60 focus:ring-red-500":"border-[#D0DDE6] focus:border-[#0097D6]",d),...k}),e.jsxs("div",{className:"flex items-start justify-between gap-2",children:[e.jsxs("div",{children:[a&&e.jsx("p",{id:`${r}-error`,role:"alert",className:"text-xs text-red-500",children:a}),!a&&u&&e.jsx("p",{id:`${r}-helper`,className:"text-xs text-[#8A9FAF]",children:u})]}),_&&e.jsxs("p",{className:w("text-xs ml-auto shrink-0",s&&D>=s?"text-red-500":"text-[#8A9FAF]"),children:[D,s?`/${s}`:""]})]})]})});b.displayName="Textarea";b.__docgenInfo={description:"",methods:[],displayName:"Textarea",props:{label:{required:!1,tsType:{name:"string"},description:""},helperText:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},showCount:{required:!1,tsType:{name:"boolean"},description:""},maxLength:{required:!1,tsType:{name:"number"},description:""}}};const U={title:"Components/Textarea",component:b,tags:["autodocs"],argTypes:{label:{control:"text",description:"Label do campo"},placeholder:{control:"text",description:"Placeholder do textarea"},helperText:{control:"text",description:"Texto auxiliar"},error:{control:"text",description:"Mensagem de erro"},showCount:{control:"boolean",description:"Exibe contador de caracteres",table:{defaultValue:{summary:"false"}}},maxLength:{control:"number",description:"Limite máximo de caracteres"},disabled:{control:"boolean",description:"Desabilita o campo",table:{defaultValue:{summary:"false"}}},rows:{control:"number",description:"Número de linhas visíveis"}},args:{placeholder:"Digite aqui..."},decorators:[d=>e.jsx("div",{className:"w-96",children:e.jsx(d,{})})]},t={},o={args:{label:"Observações",placeholder:"Descreva suas observações..."}},n={args:{label:"Mensagem",error:"Campo obrigatório — mínimo 10 caracteres",defaultValue:"curto"}},l={args:{label:"Bio",placeholder:"Fale sobre você...",showCount:!0,defaultValue:"Desenvolvedor no Instituto Itinerante."}},i={args:{label:"Tweet",placeholder:"O que você está pensando?",showCount:!0,maxLength:280,helperText:"Máximo de 280 caracteres"}},c={args:{label:"Notas (somente leitura)",defaultValue:"Este campo não pode ser editado.",disabled:!0}};var y,T,j;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:"{}",...(j=(T=t.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};var N,C,E;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    label: 'Observações',
    placeholder: 'Descreva suas observações...'
  }
}`,...(E=(C=o.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var F,q,S;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    label: 'Mensagem',
    error: 'Campo obrigatório — mínimo 10 caracteres',
    defaultValue: 'curto'
  }
}`,...(S=(q=n.parameters)==null?void 0:q.docs)==null?void 0:S.source}}};var I,M,V;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: 'Bio',
    placeholder: 'Fale sobre você...',
    showCount: true,
    defaultValue: 'Desenvolvedor no Instituto Itinerante.'
  }
}`,...(V=(M=l.parameters)==null?void 0:M.docs)==null?void 0:V.source}}};var A,L,W;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: 'Tweet',
    placeholder: 'O que você está pensando?',
    showCount: true,
    maxLength: 280,
    helperText: 'Máximo de 280 caracteres'
  }
}`,...(W=(L=i.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};var B,O,$;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    label: 'Notas (somente leitura)',
    defaultValue: 'Este campo não pode ser editado.',
    disabled: true
  }
}`,...($=(O=c.parameters)==null?void 0:O.docs)==null?void 0:$.source}}};const X=["Default","WithLabel","WithError","WithCount","MaxLength","Disabled"];export{t as Default,c as Disabled,i as MaxLength,l as WithCount,n as WithError,o as WithLabel,X as __namedExportsOrder,U as default};
