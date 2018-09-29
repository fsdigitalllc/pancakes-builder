---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
stacks:
- template: block-builder-section
  background_color: "#FFFFFF"
  size: container
  p_top: XL
  p_bottom: XL
  h_content: space-between
  v_content: center
  rows:
  - template: include-row
    cols:
    - template: block-column-builder
      size: '5'
      text_align: left
      animate: fade-up
      duration: '400'
      elements:
      - template: element-title
        tag: h1
        title: Header 1 Title Example - Center
        text_align: center
        color: "#000000"
      - template: element-title
        tag: h2
        title: Header 2 Title Example - Left
        text_align: left
    - template: block-column-builder
      size: '6'
      text_align: left
      animate: fade-up
      duration: '400'
      elements:
      - template: element-image
        image: "/uploads/blur-business-close-up-1029757.jpg"
    container_size: container
---