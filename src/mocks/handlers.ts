import { http,HttpResponse } from "msw";
const galleryList = [
    {
      id: "1",
      img: "https://res.cloudinary.com/terieyenike/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1649443651/react%20dnd/DTS_The_Green_Copson_Londan_5077.jpg",
      title: "Bank Draft",
      type:"Bank-draft"
    },
    {
      id: "2",
      img:
        "https://res.cloudinary.com/terieyenike/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1649443650/react%20dnd/DTS_Closer_Parole_Dure_5144.jpg",
        title : "Bill of Lading",
        type:"bill-of-lading"
    },
    {
      id: "3",
      img:
        "https://res.cloudinary.com/terieyenike/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1649443650/react%20dnd/DTS_Misc_1__Nich_Fancher__Nick_Fancher_4532.jpg",
        title : "Invoice",
        type:"invoice"
    },
    {
      id: "4",
      img:
        "https://res.cloudinary.com/terieyenike/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1649443800/react%20dnd/_MG_9747_nk0tz2_c_scale_w_509.jpg"
       , title : "Bank Draft 2",
       type:"bank-draft-2"
    } ,
    {
      id: "5",
      img:
        "https://picsum.photos/id/222/1200/800"
       , title : "Bill of lading 2",
       type:"bill-of-lading-2"
    } 
  ];
export const handlers = [
    http.get("/api/getGalary", () => {
        return HttpResponse.json(galleryList);
  }),
  http.post("/api/reorderGalary", ({ request }) => {
    const reOrderData = request ? request.text : "";
    sessionStorage.setItem("galaryData",reOrderData?.toString());
    return HttpResponse.json(reOrderData);
}),
];
