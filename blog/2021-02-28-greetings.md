---
slug: greetings
title: Greetings!
authors: [rhakdnj]
tags: [greetings]
---

Congratulations, you have made your first post!

Feel free to play around and edit this post as much as you like.

export const Highlight = ({children, color}) => (
<span
style={{
backgroundColor: color,
borderRadius: '20px',
color: '#fff',
padding: '10px',
cursor: 'pointer',
}}
onClick={() => {
alert(`You clicked the color ${color} with label ${children}`)
}}>
{children}
</span>
);

:::tip[My tip]

Use this awesome feature option

:::

:::danger[Take care]

This action is dangerous

:::

This is <Highlight color="#25c2a0">Docusaurus green</Highlight> !

This is <Highlight color="#1877F2">Facebook blue</Highlight> !
```jsx title="src/components/HelloDocusaurus.js"
function HelloDocusaurus() {
  return <h1>Hello, Docusaurus!</h1>;
}
```
