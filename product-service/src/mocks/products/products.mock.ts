import { ProductInterface } from '~/mocks/products/types';

const S3_IMAGE_BUCKET_BASE =
    'https://my-games-store-images.s3.eu-west-1.amazonaws.com';

export const productsMock: ProductInterface[] = [
    {
        id: 0,
        title: 'Grand Theft Auto V',
        description:
            'Grand Theft Auto V is an action-adventure game played from either a third-person or first-person perspective. Players complete missions—linear scenarios with set objectives—to progress through the story. Outside of the missions, players may freely roam the open world.',
        rating: 4.47,
        genres: 'Action, Adventure',
        price: 479,
        platforms:
            'PC, Xbox Series S/X, PlayStation 4, PlayStation 3, Xbox 360, Xbox One, PlayStation 5',
        released: '2013-09-17',
        image: `${S3_IMAGE_BUCKET_BASE}/gta5.jpg`,
    },
    {
        id: 1,
        title: 'The Witcher 3: Wild Hunt',
        description:
            'The Witcher 3: Wild Hunt is an action role-playing game with a third-person perspective. Players control Geralt of Rivia, a monster slayer known as a Witcher. Geralt walks, runs, rolls and dodges, and (for the first time in the series) jumps, climbs and swims.',
        rating: 4.67,
        genres: 'Action, Adventure, RPG',
        price: 167,
        platforms:
            'Nintendo Switch, PlayStation 5, Xbox Series S/X, Xbox One, PC, PlayStation 4',
        released: '2015-05-18',
        image: `${S3_IMAGE_BUCKET_BASE}/the_witcher_wild_hunt.jpg`,
    },
    {
        id: 2,
        title: 'Portal 2',
        description:
            'Portal 2 is a first-person perspective puzzle game. The player takes the role of Chell in the single-player campaign, as one of two robots—Atlas and P-Body—in the cooperative campaign, or as a simplistic humanoid icon in community-developed puzzles. These three characters can explore and interact with the environment.',
        rating: 4.61,
        genres: 'Shooter, Puzzle',
        price: 598,
        platforms: 'Xbox 360, Linux, macOS, PlayStation 3, PC, Xbox One',
        released: '2011-04-18',
        image: `${S3_IMAGE_BUCKET_BASE}/portal2.jpg`,
    },
    {
        id: 3,
        title: 'Counter-Strike: Global Offensive',
        description:
            'The game pits two teams, Terrorists and Counter-Terrorists, against each other in different objective-based game modes. The most common game modes involve the Terrorists planting a bomb while Counter-Terrorists attempt to stop them, or Counter-Terrorists attempting to rescue hostages that the Terrorists have captured.',
        rating: 3.57,
        genres: 'Action, Shooter',
        price: 407,
        platforms: 'PC, Xbox 360, PlayStation 3',
        released: '2012-08-21',
        image: `${S3_IMAGE_BUCKET_BASE}/csgo.jpg`,
    },
    {
        id: 4,
        title: 'The Elder Scrolls V: Skyrim',
        description:
            'The Elder Scrolls V: Skyrim is an action role-playing game, playable from either a first- or third-person perspective. The player may freely roam over the land of Skyrim, an open world environment consisting of wilderness expanses, dungeons, caves, cities, towns, fortresses, and villages.',
        rating: 4.42,
        genres: 'Action, RPG',
        price: 126,
        platforms: 'PC, Nintendo Switch, Xbox 360, PlayStation 3',
        released: '2011-11-11',
        image: `${S3_IMAGE_BUCKET_BASE}/tes_skyrim.jpg`,
    },
    {
        id: 5,
        title: 'Left 4 Dead 2',
        description:
            'Left 4 Dead 2 (abbreviated L4D2) is a single-player and multiplayer cooperative survival horror first person shooter game developed by Valve Corporation.',
        rating: 4.08,
        genres: 'Action, Shooter',
        price: 585,
        platforms: 'macOS, Linux, PC, Xbox 360',
        released: '2009-11-17',
        image: `${S3_IMAGE_BUCKET_BASE}/left4dead2.jpg`,
    },
    {
        id: 6,
        title: 'Portal',
        description:
            'Portal consists primarily of a series of puzzles that must be solved by teleporting the player\'s character and simple objects using "the Aperture Science Handheld Portal Device", often referred to as the "portal gun", a device that can create inter-spatial portals between two flat planes.',
        rating: 4.51,
        genres: 'Adventure, Puzzle',
        price: 984,
        platforms: 'PC, macOS, Linux, Xbox 360, PlayStation 3, Android',
        released: '2007-10-09',
        image: `${S3_IMAGE_BUCKET_BASE}/portal.jpg`,
    },
    {
        id: 7,
        title: 'BioShock Infinite',
        description:
            'Following in the footsteps of previous BioShock games, the world of Infinite explores the chaos that results when strong ideals are taken to an extreme. Here, the philosophical concept of "American Exceptionalism" is perverted into ultranationalism, religious fanaticism, and social Darwinism.',
        rating: 4.39,
        genres: 'Action, Shooter',
        price: 749,
        platforms:
            'PlayStation 4, Xbox 360, Nintendo Switch, Linux, PC, PlayStation 3, Xbox One',
        released: '2013-03-26',
        image: `${S3_IMAGE_BUCKET_BASE}/bioshock_infinite.jpg`,
    },
    {
        id: 8,
        title: 'Life is Strange',
        description:
            'Life Is Strange is a five-part episodic game that sets out to revolutionize story-based choice and consequence games by allowing the player to rewind time and affect the past, present, and future.',
        rating: 4.11,
        genres: 'Adventure',
        price: 438,
        platforms:
            'PC, Linux, PlayStation 3, macOS, iOS, Xbox 360, Android, PlayStation 4, Xbox One',
        released: '2015-01-29',
        image: `${S3_IMAGE_BUCKET_BASE}/life_is_strange.jpg`,
    },
    {
        id: 9,
        title: 'Borderlands 2',
        description:
            'The story follows a new group of Vault Hunters who must ally with the Crimson Raiders, a resistance group made up of civilian survivors and guerrilla fighters, to defeat the tyrannical Handsome Jack before he can unlock the power of a new Vault.',
        rating: 4.03,
        genres: 'Action, Shooter, RPG',
        price: 456,
        platforms:
            'PlayStation 4, Xbox 360, PlayStation 3, PC, Xbox One, macOS',
        released: '2012-09-18',
        image: `${S3_IMAGE_BUCKET_BASE}/borderlands2.jpg`,
    },
    {
        id: 10,
        title: 'Half-Life 2',
        description:
            'Half-Life 2 is a 2004 first-person shooter game developed by Valve. It was published by Valve through its distribution service Steam. Like the original Half-Life (1998), Half-Life 2 combines shooting, puzzles, and storytelling, and adds features such as vehicles and physics-based gameplay.',
        rating: 4.5,
        genres: 'Action, Shooter',
        price: 429,
        platforms: 'PC, Xbox 360, Linux, Xbox, Android, macOS',
        released: '2004-11-16',
        image: `${S3_IMAGE_BUCKET_BASE}/half_life2.jpg`,
    },
    {
        id: 11,
        title: 'Limbo',
        description:
            'Limbo is a 2D side-scroller, incorporating a physics system that governs environmental objects and the player character. The player guides an unnamed boy through dangerous environments and traps as he searches for his sister.',
        rating: 4.16,
        genres: 'Adventure, Indie, Puzzle, Platformer',
        price: 925,
        platforms:
            'Linux, PS Vita, Android, Xbox One, Nintendo Switch, iOS, PC, macOS, Xbox 360, PlayStation 3, PlayStation 4',
        released: '2010-07-21',
        image: `${S3_IMAGE_BUCKET_BASE}/limbo.jpg`,
    },
];
