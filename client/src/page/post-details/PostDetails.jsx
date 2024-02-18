import React, { useState } from "react";
import PostAuthor from "../../components/post-author/PostAuthor";
import { Link } from "react-router-dom";
import Thumbnail from "../../images/blog23.jpg";
import { DUMMY_POSTS } from "../../config";

import "./PostDetails.css";

const PostDetails = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor />
          <div className="post-detail__buttons">
            <Link to={`/posts/${posts.id}/edit`} className="btn sm primary">
              edit
            </Link>
            <Link to={`/posts/${posts.id}/delete`} className="btn sm danger">
              delete
            </Link>
          </div>
        </div>
        <h1>This is the post title</h1>
        <div className="post-detail__thumbnail">
          <img src={Thumbnail} />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          ducimus rem esse, eius quod molestiae ratione hic nobis temporibus
          reiciendis nulla, accusantium impedit natus dicta iusto eos atque est
          laudantium fugiat sed qui. Eveniet maiores quaerat aut odio, nesciunt
          placeat facere.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
          perferendis ex temporibus! Expedita iste quod voluptate eius odit
          atque laboriosam praesentium assumenda cupiditate est! Ad repellendus
          temporibus consequatur accusamus labore, ipsum, hic illum minima, nam
          iusto commodi laboriosam officia! Quod aliquid doloremque veritatis
          fugiat molestias eligendi esse, perspiciatis explicabo enim velit
          dolorum, autem reiciendis optio?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          maiores eius quis mollitia facere, sequi nam? Doloremque cupiditate
          nostrum assumenda, cumque cum dolore alias! Atque ipsam voluptate,
          laudantium repellat id modi recusandae molestiae adipisci natus?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          accusamus possimus at. Excepturi possimus doloremque corrupti in fuga
          enim magnam, minus harum, nihil, itaque dignissimos aut tenetur fugiat
          ab sit incidunt vitae. Nesciunt eum commodi cumque vel ducimus
          consequatur! Dolore est nulla similique. Non natus labore excepturi
          doloribus suscipit numquam voluptate provident animi explicabo tenetur
          sit quisquam ut odio adipisci accusantium sunt, hic quis placeat vero
          culpa nostrum sapiente. Perspiciatis quisquam, velit dicta maiores
          error assumenda vitae nobis, in obcaecati soluta similique! Suscipit
          cupiditate minus possimus quas maxime eaque, sapiente officia iste id
          nisi ullam quod placeat nam deserunt praesentium mollitia culpa,
          maiores ex ea excepturi beatae explicabo optio. Sunt nemo dolore
          maiores obcaecati nulla esse modi doloribus id, vel eius fuga fugiat
          doloremque deserunt minus assumenda! Inventore consectetur excepturi
          eaque ut hic voluptate! Nostrum culpa libero ipsam? Neque, iusto. Quae
          facere maiores libero nulla necessitatibus quaerat eos. Vero dolor a
          ab fugiat ipsum veniam impedit deleniti veritatis ipsam eaque dolorum,
          non laboriosam harum sint molestias iusto praesentium, ipsa
          reprehenderit molestiae consectetur dolorem similique, incidunt
          voluptas illum? Iusto nulla velit non numquam placeat ducimus eos esse
          nesciunt beatae, quo expedita ad sit ipsam quam error nisi enim facere
          quidem soluta consequuntur voluptatibus! Voluptatum eligendi beatae
          reiciendis quibusdam, nobis quidem optio ad quia. Expedita aperiam
          placeat officia aut nihil, beatae perferendis iste itaque, neque
          incidunt sint libero esse natus rem repellat modi commodi ad sed
          voluptatem nostrum non! Adipisci consectetur, rerum pariatur eaque
          enim sapiente! Qui velit impedit eos at assumenda!
        </p>
      </div>
    </section>
  );
};

export default PostDetails;
