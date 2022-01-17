interface IClassNames {
  [className: string]: string
}

declare module '*.css' {
  const classNames: IClassNames
  export = classNames
}

declare module '*.scss' {
  const classNames: IClassNames
  export = classNames
}

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.png' {
  const content: any
  export default content
}