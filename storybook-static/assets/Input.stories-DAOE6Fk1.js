import{j as e}from"./jsx-runtime-Z5uAzocK.js";import{I as a}from"./Input-CqW3ui8N.js";import"./index-pP6CS22B.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./lib-BLSKlp9E.js";const q={title:"Components/Input",component:a,tags:["autodocs"],argTypes:{label:{control:"text",description:"Label do campo"},placeholder:{control:"text",description:"Placeholder do input"},helperText:{control:"text",description:"Texto auxiliar exibido abaixo do campo"},error:{control:"text",description:"Mensagem de erro (borda vermelha + aria-invalid)"},disabled:{control:"boolean",description:"Desabilita o campo",table:{defaultValue:{summary:"false"}}},type:{control:"select",options:["text","email","password","number","search","tel"],description:"Tipo do input HTML"}},args:{placeholder:"Digite algo..."},decorators:[B=>e.jsx("div",{className:"w-80",children:e.jsx(B,{})})]},r={},l={args:{label:"Email",placeholder:"voce@exemplo.com",type:"email"}},s={args:{label:"Senha",type:"password",placeholder:"Mínimo 8 caracteres",helperText:"Use letras maiúsculas, minúsculas e números"}},o={args:{label:"Email",type:"email",defaultValue:"nao-e-um-email",error:"Por favor, insira um email válido"}},t={args:{label:"Buscar",placeholder:"Buscar livros...",leftElement:e.jsx("span",{className:"text-sm",children:"🔍"})}},n={args:{label:"Data",placeholder:"DD/MM/AAAA",rightElement:e.jsx("span",{className:"text-sm",children:"📅"})}},i={args:{label:"Campo desabilitado",defaultValue:"Valor somente leitura",disabled:!0}},c={render:()=>e.jsxs("div",{className:"flex flex-col gap-5 w-80",children:[e.jsx(a,{label:"Default",placeholder:"Padrão"}),e.jsx(a,{label:"Com helper",placeholder:"Email",helperText:"Usaremos apenas para notificações",type:"email"}),e.jsx(a,{label:"Com erro",defaultValue:"valor-invalido",error:"Este campo é obrigatório"}),e.jsx(a,{label:"Com ícone esquerdo",placeholder:"Buscar...",leftElement:e.jsx("span",{children:"🔍"})}),e.jsx(a,{label:"Com ícone direito",placeholder:"DD/MM/AAAA",rightElement:e.jsx("span",{children:"📅"})}),e.jsx(a,{label:"Desabilitado",defaultValue:"Somente leitura",disabled:!0})]})};var p,m,d;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(d=(m=r.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var u,h,b;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    placeholder: 'voce@exemplo.com',
    type: 'email'
  }
}`,...(b=(h=l.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var x,g,f;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: 'Senha',
    type: 'password',
    placeholder: 'Mínimo 8 caracteres',
    helperText: 'Use letras maiúsculas, minúsculas e números'
  }
}`,...(f=(g=s.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var E,D,v;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    type: 'email',
    defaultValue: 'nao-e-um-email',
    error: 'Por favor, insira um email válido'
  }
}`,...(v=(D=o.parameters)==null?void 0:D.docs)==null?void 0:v.source}}};var A,j,S;t.parameters={...t.parameters,docs:{...(A=t.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: 'Buscar',
    placeholder: 'Buscar livros...',
    leftElement: <span className="text-sm">🔍</span>
  }
}`,...(S=(j=t.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var M,y,C;n.parameters={...n.parameters,docs:{...(M=n.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    label: 'Data',
    placeholder: 'DD/MM/AAAA',
    rightElement: <span className="text-sm">📅</span>
  }
}`,...(C=(y=n.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var T,V,W;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    label: 'Campo desabilitado',
    defaultValue: 'Valor somente leitura',
    disabled: true
  }
}`,...(W=(V=i.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var I,N,w;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-5 w-80">
      <Input label="Default" placeholder="Padrão" />
      <Input label="Com helper" placeholder="Email" helperText="Usaremos apenas para notificações" type="email" />
      <Input label="Com erro" defaultValue="valor-invalido" error="Este campo é obrigatório" />
      <Input label="Com ícone esquerdo" placeholder="Buscar..." leftElement={<span>🔍</span>} />
      <Input label="Com ícone direito" placeholder="DD/MM/AAAA" rightElement={<span>📅</span>} />
      <Input label="Desabilitado" defaultValue="Somente leitura" disabled />
    </div>
}`,...(w=(N=c.parameters)==null?void 0:N.docs)==null?void 0:w.source}}};const _=["Default","WithLabel","WithHelperText","WithError","WithLeftElement","WithRightElement","Disabled","AllStates"];export{c as AllStates,r as Default,i as Disabled,o as WithError,s as WithHelperText,l as WithLabel,t as WithLeftElement,n as WithRightElement,_ as __namedExportsOrder,q as default};
