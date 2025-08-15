import * as Yup from "yup";

export const CreatePostSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

export const CreateCommentSchema = Yup.object().shape({
  comment: Yup.string()
    .required("Comment is required")
    .min(3, "Comment must be at least 3 characters"),
});
export const EditSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});