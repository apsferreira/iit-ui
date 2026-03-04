import{j as e}from"./jsx-runtime-Z5uAzocK.js";import{r as t}from"./index-pP6CS22B.js";import{c as n}from"./lib-BLSKlp9E.js";import{B as g}from"./Button-Cd938xBQ.js";import{B as l}from"./Badge-DZzX2j3c.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-DglmNpsn.js";const d=t.forwardRef(({className:a,hoverable:r,...s},W)=>e.jsx("div",{ref:W,className:n("rounded-xl border border-[#2A2A38] bg-[#111118] text-[#F4F4F8]","shadow-sm shadow-black/40",r&&"transition-colors duration-150 hover:border-[#3A3A50] hover:bg-[#18181F]",a),...s}));d.displayName="Card";const i=t.forwardRef(({className:a,...r},s)=>e.jsx("div",{ref:s,className:n("flex flex-col gap-1.5 p-6 pb-0",a),...r}));i.displayName="CardHeader";const c=t.forwardRef(({className:a,...r},s)=>e.jsx("h3",{ref:s,className:n("text-lg font-semibold leading-tight tracking-tight text-[#F4F4F8]",a),...r}));c.displayName="CardTitle";const j=t.forwardRef(({className:a,...r},s)=>e.jsx("p",{ref:s,className:n("text-sm text-[#A1A1B5]",a),...r}));j.displayName="CardDescription";const o=t.forwardRef(({className:a,...r},s)=>e.jsx("div",{ref:s,className:n("p-6",a),...r}));o.displayName="CardBody";const f=t.forwardRef(({className:a,...r},s)=>e.jsx("div",{ref:s,className:n("flex items-center px-6 py-4 pt-0",a),...r}));f.displayName="CardFooter";d.__docgenInfo={description:"",methods:[],displayName:"Card",props:{hoverable:{required:!1,tsType:{name:"boolean"},description:"Add a subtle border glow on hover"}}};i.__docgenInfo={description:"",methods:[],displayName:"CardHeader"};c.__docgenInfo={description:"",methods:[],displayName:"CardTitle"};j.__docgenInfo={description:"",methods:[],displayName:"CardDescription"};o.__docgenInfo={description:"",methods:[],displayName:"CardBody"};f.__docgenInfo={description:"",methods:[],displayName:"CardFooter"};const J={title:"Components/Card",component:d,tags:["autodocs"],argTypes:{hoverable:{control:"boolean",description:"Adiciona efeito visual no hover (borda + fundo)",table:{defaultValue:{summary:"false"}}}},args:{hoverable:!1},decorators:[a=>e.jsx("div",{className:"p-4 min-w-[320px]",children:e.jsx(a,{})})]},m={render:a=>e.jsx(d,{...a,children:e.jsx(o,{children:e.jsx("p",{className:"text-[#A1A1B5] text-sm",children:"Conteúdo do card sem estrutura definida."})})})},p={render:a=>e.jsxs(d,{...a,children:[e.jsx(i,{children:e.jsx(c,{children:"Título do Card"})}),e.jsx(o,{children:e.jsx("p",{className:"text-[#A1A1B5] text-sm",children:"Corpo com conteúdo relevante."})})]})},x={render:a=>e.jsxs(d,{...a,children:[e.jsx(o,{children:e.jsx("p",{className:"text-[#A1A1B5] text-sm",children:"Conteúdo do card com rodapé."})}),e.jsxs(f,{children:[e.jsx(g,{size:"sm",variant:"secondary",children:"Cancelar"}),e.jsx(g,{size:"sm",children:"Confirmar"})]})]})},C={render:a=>e.jsxs(d,{...a,children:[e.jsx(i,{children:e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{children:[e.jsx(c,{children:"Projeto Focus Hub"}),e.jsx(j,{children:"Sistema de produtividade GTD"})]}),e.jsx(l,{variant:"success",dot:!0,children:"Ativo"})]})}),e.jsxs(o,{children:[e.jsx("p",{className:"text-[#A1A1B5] text-sm",children:"Fase 1 completa com 35 endpoints REST, habit tracking e gamificação."}),e.jsxs("div",{className:"flex gap-2 mt-3",children:[e.jsx(l,{variant:"info",children:"React 18"}),e.jsx(l,{variant:"brand",children:"Go"}),e.jsx(l,{variant:"neutral",children:"PostgreSQL"})]})]}),e.jsxs(f,{children:[e.jsx(g,{size:"sm",variant:"ghost",children:"Ver detalhes"}),e.jsx(g,{size:"sm",children:"Acessar"})]})]})},h={args:{hoverable:!0},render:a=>e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("p",{className:"text-xs text-[#8A9FAF]",children:"Passe o mouse sobre o card"}),e.jsxs(d,{...a,children:[e.jsx(i,{children:e.jsx(c,{children:"Card Hoverable"})}),e.jsx(o,{children:e.jsx("p",{className:"text-[#A1A1B5] text-sm",children:"Efeito de hover com transição suave na borda e fundo."})})]})]})},u={render:a=>e.jsxs(d,{...a,className:"p-6",children:[e.jsx("p",{className:"text-[#F4F4F8] font-medium",children:"Card simples"}),e.jsx("p",{className:"text-[#A1A1B5] text-sm mt-1",children:"Sem subcomponentes, apenas className com padding."})]})};var v,B,N;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <Card {...args}>
      <CardBody>
        <p className="text-[#A1A1B5] text-sm">Conteúdo do card sem estrutura definida.</p>
      </CardBody>
    </Card>
}`,...(N=(B=m.parameters)==null?void 0:B.docs)==null?void 0:N.source}}};var A,b,y;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <Card {...args}>
      <CardHeader>
        <CardTitle>Título do Card</CardTitle>
      </CardHeader>
      <CardBody>
        <p className="text-[#A1A1B5] text-sm">Corpo com conteúdo relevante.</p>
      </CardBody>
    </Card>
}`,...(y=(b=p.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var F,S,H;x.parameters={...x.parameters,docs:{...(F=x.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: args => <Card {...args}>
      <CardBody>
        <p className="text-[#A1A1B5] text-sm">Conteúdo do card com rodapé.</p>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="secondary">Cancelar</Button>
        <Button size="sm">Confirmar</Button>
      </CardFooter>
    </Card>
}`,...(H=(S=x.parameters)==null?void 0:S.docs)==null?void 0:H.source}}};var T,_,w;C.parameters={...C.parameters,docs:{...(T=C.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: args => <Card {...args}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Projeto Focus Hub</CardTitle>
            <CardDescription>Sistema de produtividade GTD</CardDescription>
          </div>
          <Badge variant="success" dot>Ativo</Badge>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-[#A1A1B5] text-sm">
          Fase 1 completa com 35 endpoints REST, habit tracking e gamificação.
        </p>
        <div className="flex gap-2 mt-3">
          <Badge variant="info">React 18</Badge>
          <Badge variant="brand">Go</Badge>
          <Badge variant="neutral">PostgreSQL</Badge>
        </div>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="ghost">Ver detalhes</Button>
        <Button size="sm">Acessar</Button>
      </CardFooter>
    </Card>
}`,...(w=(_=C.parameters)==null?void 0:_.docs)==null?void 0:w.source}}};var R,D,z;h.parameters={...h.parameters,docs:{...(R=h.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    hoverable: true
  },
  render: args => <div className="flex flex-col gap-3">
      <p className="text-xs text-[#8A9FAF]">Passe o mouse sobre o card</p>
      <Card {...args}>
        <CardHeader>
          <CardTitle>Card Hoverable</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-[#A1A1B5] text-sm">Efeito de hover com transição suave na borda e fundo.</p>
        </CardBody>
      </Card>
    </div>
}`,...(z=(D=h.parameters)==null?void 0:D.docs)==null?void 0:z.source}}};var E,I,P;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <Card {...args} className="p-6">
      <p className="text-[#F4F4F8] font-medium">Card simples</p>
      <p className="text-[#A1A1B5] text-sm mt-1">Sem subcomponentes, apenas className com padding.</p>
    </Card>
}`,...(P=(I=u.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};const K=["Default","WithHeader","WithFooter","WithAllSubcomponents","Hoverable","Simple"];export{m as Default,h as Hoverable,u as Simple,C as WithAllSubcomponents,x as WithFooter,p as WithHeader,K as __namedExportsOrder,J as default};
