export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == "${userId}"]`;
  return query;
};

export const feedQuery = `*[_type == "gem"] | order(_createdAt desc) {
  image {
    asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[] {
    _key,
    postedBy -> {
      _id,
      userName,
      image
    },
  },
}`;

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "gem" && title match "${searchTerm}*" || category match "${searchTerm}*" || about match "${searchTerm}*"] {
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;

  return query;
};

export const gemDetailsQuery = (gemId) => {
  const query = `*[_type == "gem" && _id == "${gemId}"] {
    title,
    about,
    category,
    _createdAt,
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      }
    },
    comments[] {
      comment,
      _key,
      createdAt,
      postedBy -> {
        _id,
        userName,
        image
      },
    }
  }`;

  return query;
};

export const gemDetailsMoreGemsQuery = (gem) => {
  const query = `*[_type == "gem" && category == '${gem.category}' && _id != '${gem._id}' ]{
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;

  return query;
};

export const userCreatedGemsQuery = (userId) => {
  const query = `*[_type == "gem" && userId == '${userId}'] | order(_createdAt desc) {
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;

  return query;
};

export const userSavedGemsQuery = (userId) => {
  const query = `*[_type == 'gem' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;

  return query;
};

export const categories = [
  {
    name: 'Ocean',
    image:
      'https://images.pexels.com/photos/4498933/pexels-photo-4498933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Flowers',
    image:
      'https://images.pexels.com/photos/1075960/pexels-photo-1075960.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Mountains',
    image:
      'https://images.pexels.com/photos/16327878/pexels-photo-16327878/free-photo-of-aerial-photo-of-a-mountain-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Deserts',
    image:
      'https://images.pexels.com/photos/3694341/pexels-photo-3694341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Birds',
    image:
      'https://images.pexels.com/photos/3641282/pexels-photo-3641282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Sunsets',
    image:
      'https://images.pexels.com/photos/2074746/pexels-photo-2074746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Adventure',
    image:
      'https://images.pexels.com/photos/1590042/pexels-photo-1590042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Wildlife',
    image:
      'https://images.pexels.com/photos/62324/leopard-safari-wildier-botswana-62324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Plants',
    image:
      'https://images.pexels.com/photos/68076/pexels-photo-68076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Forests',
    image:
      'https://images.pexels.com/photos/998723/pexels-photo-998723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Others',
    image:
      'https://images.pexels.com/photos/6744887/pexels-photo-6744887.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const lastCategory = categories.pop();
categories.sort((a, b) => a.name.localeCompare(b.name));
categories.push(lastCategory);
