export interface AppInterface {
  activeLang: string,
  languages: LanguageInterface[] | []
}


export interface LanguageInterface {
  lang: string,
  title: string
}

export interface LanguageDispatchInterface {
  lang?: string,
  title?: string
}




