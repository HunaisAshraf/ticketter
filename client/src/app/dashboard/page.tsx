import axios from "axios";
import { cookies, headers } from "next/headers";

// export const getServerSideProps = async () => {
//   try {
//     const { data } = await axios.get(
//       "http://ingress-nginx.imgress-nginx-controller.svc.cluster.local/api/users/currentuser"
//     );
//     return { props: { user: data } };
//   } catch (error) {
//     console.log(error);
//   }
// };

const getData = async () => {
  try {
    const token = cookies().get("token")?.value || "";

    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          Host: "ticket.dev",
          Authorization: token,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default async function Dashboard() {
  const user = await getData();

  console.log(user);

  return <h1>user {user?.name}</h1>;
}
