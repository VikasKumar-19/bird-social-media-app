export const formatDate = (date: number)=>{
  return new Date(date).toLocaleDateString("en-US");
}