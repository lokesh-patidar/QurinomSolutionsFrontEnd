import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsFileText } from "react-icons/bs";
import { SlHandbag } from "react-icons/sl";
import img1 from "../Images/backgroundlinkedin.jpg";
import img2 from "../Images/light-lamp-bedside-lamp-illumination-50583 - Copy.jpeg";
import img3 from "../Images/pexels-photo-219998 - Copy.jpeg";

export const dashData = [
     {
          id: 1,
          img: <AiOutlineDollarCircle size={'40%'} color="#077d0d" />,
          title: 'Earning',
          value: '$198k',
          perMonth: '37.8% this month',
     },
     {
          id: 2,
          img: <BsFileText size={'40%'} color="#a507e3" />,
          title: 'Orders',
          value: '$2.4k',
          perMonth: '2% this month',
     },
     {
          id: 3,
          img: <AiOutlineDollarCircle size={'40%'} color="#3946bd" />,
          title: 'Balance',
          value: '$2.4k',
          perMonth: '2% this month',
     },
     {
          id: 4,
          img: <SlHandbag size={'40%'} color="#bd3944" />,
          title: 'Total Sales',
          value: '$89k',
          perMonth: '11% this week',
     }
];



export const tableData = [
     {
          'id': 1,
          'img': img1,
          'title': 'Abstract 3D',
          'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
          'stock': '32 in stock',
          "price": '$ 45.99',
          'totalSales': '20',
     },
     {
          'id': 2,
          'img': img2,
          'title': 'Sarphens illustration',
          'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
          'stock': '32 in stock',
          "price": '$ 45.99',
          'totalSales': '20',
     },
     {
          'img': img3,
          'id': 3,
          'title': 'Abstract 3D',
          'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
          'stock': '32 in stock',
          "price": '$ 45.99',
          'totalSales': '20',
     }
]