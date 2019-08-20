import React from 'react';
import './styles/Page.css';

export default function Page(props) {
  return <section className="page">{props.children}</section>;
}
