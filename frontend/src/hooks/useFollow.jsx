// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// const useFollow = () => {
// 	const queryClient = useQueryClient();

// 	const { mutate: follow, isPending } = useMutation({
// 		mutationFn: async (userId) => {
// 			try {
// 				const res = await fetch(`/api/users/follow/${userId}`, {
// 					method: "POST",
// 				});

// 				const data = await res.json();
// 				if (!res.ok) {
// 					throw new Error(data.error || "Something went wrong!");
// 				}
// 				return;
// 			} catch (error) {
// 				throw new Error(error.message);
// 			}
// 		},
// 		onSuccess: () => {
// 			Promise.all([
// 				queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
// 				queryClient.invalidateQueries({ queryKey: ["authUser"] }),
// 			]);
// 		},
// 		onError: (error) => {
// 			toast.error(error.message);
// 		},
// 	});

// 	return { follow, isPending };
// };

// export default useFollow;
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutate: follow, isPending } = useMutation({
    mutationFn: async (userId) => {
      try {
        const res = await axios.post(`/api/users/follow/${userId}`);
        const data = res.data;
        if (!res.status === 200) {
          throw new Error(data.error || "Something went wrong!");
        }
        return;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { follow, isPending };
};

export default useFollow;