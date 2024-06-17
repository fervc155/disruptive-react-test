
export default class Theme {
  _id: string | number ='';
  name: string='';
  url:string=''
  permissions= {
    images: false,
    videos: false,
    text: false
  };
}

export class CreateThemeModel{
  name: string='';
  images:boolean=false;
  videos:boolean= false;
  text:boolean= false;
}
