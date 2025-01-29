type UserImageProps = {
  image: string;
  username: string;
};

export const UserImage = ({ image, username }: UserImageProps): JSX.Element => {
  const userImage = image || "https://i.imgur.com/zDxXZKk.png";
  return (
    <a href={`/#/profile/${username}`}>
      <img src={userImage} />
    </a>
  );
};
