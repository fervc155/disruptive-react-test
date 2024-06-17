export default class ContentModel{
    _id:string | number='';
    title: string= '';
    theme: any= {};
    category: any= {};
    type: string='';
    url: string='';
    text:string= '';
    user:any={};
    createdAt:any='';
  }

  export class CreateContentModel{
    title: string= '';
    theme: any= {};
    category: any= {};
    type: string='';
    text:string= '';
  }