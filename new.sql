PRAGMA foreign_keys= ON;

BEGIN TRANSACTION;

create table blog_settings
(
    title       TEXT not null,
    description TEXT not null
);

create table users
(
    id         integer     not null
        primary key autoincrement,
    first_name text        not null,
    last_name  text        not null,
    email      text unique not null,
    password   text        not null
);

create table articles
(
    id           integer                   not null
        primary key autoincrement,
    title        text                      not null,
    subtitle     text                      not null,
    content      text                      not null,
    likes        int  default 0            not null,
    dislikes     int  default 0            not null,
    author_id    integer                   not null
        references users,
    created_at   date default current_date not null,
    published_at date,
    modified_at  date
);

create table comments
(
    id         integer                   not null
        primary key autoincrement,
    user_id    integer                   not null
        references users,
    article_id integer                   not null
        references articles,
    message    text                      not null,
    created_at date default current_date not null
);


INSERT INTO blog_settings (title, description)
VALUES ('MicroVerse', '                                        <h2>Welcome to MicroVerse!</h2>MicroVerse is a powerful microblogging platform that allows you to connect with a community of writers, creators, and enthusiasts. With MicroVerse, you can share your thoughts, ideas, and stories with the world while discovering  content from other users.<h3>Features:</h3><ul><li><span style="font-weight: normal;"></span>Create an Account: Sign up and join the MicroVerse community to start sharing your voice and engaging with other users.</li><li>Create Articles: Express your creativity and expertise by composing
compelling articles on various topics. Share your knowledge, insights,
and experiences with a global audience.</li><li>View Other People''s Articles: Explore a vast collection of articles written by talented individuals. Discover new perspectives, learn something new, and get inspired by the diverse content available.</li></ul><p>At MicroVerse, we believe in the power of storytelling and the ability to connect through words. Whether you''re a seasoned writer or just starting your blogging journey, MicroVerse provides the perfect platform to amplify your voice and engage with like-minded individuals.<br><br><b>Join us today and become part of the MicroVerse community!</b></p>

                ');

INSERT INTO users (id, first_name, last_name, email, password)
VALUES (1, 'Cristian', 'Nita', 'cristian.nita@email.com', 'test');
INSERT INTO users (id, first_name, last_name, email, password)
VALUES (2, 'Ion', 'Popescu', 'ion.popescu@email.com', 'test');


INSERT INTO articles (id, title, subtitle, content, likes, dislikes, author_id, created_at, published_at, modified_at)
VALUES (1, 'Exploring Remote Work Trends', 'Adapting to the Changing Work Landscape',
        'The traditional work landscape has undergone a significant transformation in recent years. The rise of technology and the increasing globalization of business have led to a shift in how and where work is conducted. One of the most notable changes is the widespread adoption of remote work and hybrid models.<br><br>Remote work refers to the practice of working outside a traditional office environment, often from the comfort of one''s home or a location of their choice. This shift has been fueled by advancements in communication technology, making it easier than ever to connect and collaborate with colleagues from different locations. Remote work offers numerous benefits, including increased flexibility, improved work-life balance, and reduced commuting time and expenses.<br><br>In addition to remote work, many organizations have embraced hybrid models, which combine remote and in-person work. This approach allows employees to divide their time between working remotely and coming into the office as needed. Hybrid models provide the best of both worlds, allowing for collaboration and face-to-face interactions while still offering the flexibility and autonomy of remote work.<br><br>The changing work landscape has also given rise to a range of digital tools and platforms designed to support remote collaboration and communication. From video conferencing and project management software to instant messaging and virtual whiteboards, these tools enable teams to stay connected and collaborate effectively, regardless of their physical location.<br><br>While remote work and hybrid models offer numerous advantages, they also present unique challenges. Maintaining effective communication, managing work-life balance, and fostering team cohesion can be more complex when working remotely. Organizations must adapt their policies, processes, and management styles to ensure the success and well-being of their remote and hybrid workforce.<br><br>As the work landscape continues to evolve, it is crucial for individuals and organizations to adapt and embrace these changes. By embracing remote work and hybrid models, businesses can attract and retain top talent, increase productivity, and create a more flexible and inclusive work environment.<br><br>In conclusion, adapting to the changing work landscape is essential in today''s digital age. Remote work and hybrid models offer new opportunities and challenges that require individuals and organizations to embrace flexibility, adopt digital tools, and prioritize effective communication. By doing so, we can create a work landscape that is more adaptable, inclusive, and suited to the needs of the modern workforce.',
        0, 0, 1, '2023-07-12', '2023-07-12', '2023-07-15 07:09:43');
INSERT INTO articles (id, title, subtitle, content, likes, dislikes, author_id, created_at, published_at, modified_at)
VALUES (2, 'Discovering the Wonders of Nature', 'Immerse Yourself in the Beauty of the Outdoors',
        'Nature has always fascinated and inspired us with its beauty, diversity, and wonders. Exploring and discovering the wonders of nature can be a truly enriching and awe-inspiring experience. It allows us to connect with the world around us, gain a deeper understanding of our planet, and appreciate the intricate and harmonious ecosystems that exist.<br><br>One of the most captivating aspects of nature is its breathtaking landscapes. From towering mountains and cascading waterfalls to serene forests and vast oceans, nature''s landscapes offer a glimpse into the magnificence and grandeur of our planet. Hiking through scenic trails, witnessing stunning sunsets, or simply immersing oneself in the tranquility of nature can evoke a sense of peace and wonder.<br><br>Nature also provides a home to an incredible array of plants and wildlife. Exploring diverse ecosystems allows us to witness the wonders of biodiversity firsthand. From vibrant tropical rainforests teeming with exotic plant species to expansive coral reefs bustling with marine life, each ecosystem offers unique and captivating sights. Observing animals in their natural habitats, hearing the melodies of birds, and marveling at the intricate patterns and colors of flowers and plants can ignite a sense of wonder and appreciation for the natural world.<br><br>In addition to its aesthetic beauty, nature also offers numerous health benefits. Spending time outdoors, breathing in fresh air, and being surrounded by green spaces have been proven to reduce stress, improve mental well-being, and enhance overall physical health. Nature has a calming effect on the mind and provides an opportunity for relaxation, rejuvenation, and reflection.<br><br>Furthermore, exploring nature can foster a sense of environmental awareness and conservation. Witnessing the fragility and interconnectedness of ecosystems can inspire us to become advocates for the protection and preservation of our natural world. By understanding and valuing nature''s wonders, we can contribute to sustainable practices and work towards a more harmonious coexistence with the environment.<br><br>Whether it''s embarking on a nature hike, camping under starry skies, or simply taking a moment to appreciate the beauty of a blooming flower, discovering the wonders of nature offers a profound and transformative experience. It reminds us of our connection to the natural world and instills a sense of humility, curiosity, and respect. So, venture out into nature, immerse yourself in its wonders, and let it awaken your senses and inspire your soul.',
        0, 0, 1, '2023-07-12', '2023-07-12', '2023-07-15 07:12:24');
INSERT INTO articles (id, title, subtitle, content, likes, dislikes, author_id, created_at, published_at, modified_at)
VALUES (3, 'The Power of Meditation', 'Unlocking Inner Peace and Clarity', 'Meditation is a transformative practice that allows individuals to tap into their inner resources and cultivate a state of calmness and clarity. It involves focusing one''s attention and eliminating the stream of thoughts that often flood the mind. By engaging in regular meditation, individuals can experience a wide range of benefits, including reduced stress, improved concentration, enhanced emotional well-being, and increased self-awareness.<p>During meditation, individuals typically find a quiet and comfortable space where they can sit or lie down. They may choose to close their eyes or keep them partially open, whatever feels most natural to them. The practice often begins by bringing attention to the breath, observing its natural rhythm, and allowing thoughts to come and go without judgment. Over time, individuals may explore various meditation techniques, such as mindfulness, loving-kindness, or transcendental meditation, to deepen their practice and explore different aspects of their inner world.</p><p>Research has shown that meditation can have a profound impact on both mental and physical health. Regular practitioners often report feeling more relaxed, less anxious, and better equipped to handle life''s challenges. The practice helps cultivate a sense of inner peace and resilience, enabling individuals to navigate the ups and downs of life with greater ease. Moreover, meditation has been linked to improved cognitive function, increased compassion and empathy, and even enhanced immune system function.</p><p>If you''re new to meditation, it''s important to approach it with an open mind and be patient with yourself. Like any skill, meditation takes practice and consistency to yield the desired benefits. Start with shorter sessions and gradually increase the duration as you become more comfortable. There are also numerous guided meditation apps and online resources available that can provide structure and guidance for your practice.</p><p>In today''s fast-paced and often chaotic world, taking time to incorporate meditation into your daily routine can be a game-changer. By dedicating a few moments each day to sit in stillness and connect with your inner self, you can experience a profound shift in your overall well-being and cultivate a greater sense of peace, clarity, and balance in your life.</p>
                ', 0, 0, 1, '2023-07-13', '2023-07-13 04:43:20', '2023-07-15 07:15:08');
INSERT INTO articles (id, title, subtitle, content, likes, dislikes, author_id, created_at, published_at, modified_at)
VALUES (4, 'The Art of Mindful Eating', 'Nourishing Your Body and Soul',
        '<p>In today''s <b>fast-paced world</b>, <u>eating</u> has become a hurried and often mindless activity. We rush through meals, barely tasting our food, while our attention is divided between screens, work, and other distractions. This has led to a disconnection from the experience of eating and a disregard for the impact it has on our overall well-being.</p><p>"<font style="background-color: rgb(255, 255, 0);" color="#000000">The Art of Mindful Eating</font>" invites us to slow down, savor each bite, and develop a more conscious and nourishing relationship with food. Mindful eating is not about strict diets or deprivation; it is a practice that encourages us to bring awareness and intention to our meals.</p><p>By engaging our senses and paying attention to the flavors, textures, and smells of our food, we can enhance our enjoyment and satisfaction. Mindful eating also involves tuning into our body''s hunger and fullness cues, allowing us to eat in a way that supports our physical needs.</p><p>In this article, we explore the principles and benefits of mindful eating, providing practical tips to incorporate this practice into our daily lives. We delve into the importance of mindful food choices, understanding the origins and quality of what we consume, and cultivating gratitude for the nourishment we receive.</p><p>Furthermore, we explore the connection between our emotions and eating habits, as well as how to identify and address emotional eating patterns. By developing awareness around our triggers and finding alternative ways to cope with emotions, we can foster a healthier relationship with food.</p><p>"<span style="font-family: &quot;Courier New&quot;;">The Art of Mindful Eating</span>" is a journey of self-discovery and self-care. It encourages us to slow down, appreciate the abundance of flavors and textures available, and make conscious choices that support our well-being. By embracing mindful eating, we can transform our meals into nourishing rituals and cultivate a harmonious connection between our body, mind, and food.</p><p>Join us on this exploration of mindful eating and unlock the transformative power of savoring each moment at the table.</p><p>Remember, nourishing yourself goes beyond the food on your plate; it encompasses the joy, gratitude, and mindful presence you bring to each meal.</p>',
        0, 0, 4, '2023-07-13', null, '2023-07-15 07:20:45');
INSERT INTO articles (id, title, subtitle, content, likes, dislikes, author_id, created_at, published_at, modified_at)
VALUES (5, 'Mastering Time Management', 'Efficiency Tips for a Productive Life', '<p>In today''s fast-paced world, effective time management has become a crucial skill. Mastering time management allows you to accomplish more in less time, reduce stress, and achieve a better work-life balance. In this article, we will explore valuable strategies and techniques to help you take control of your time and become a master of time management.</p><ol><li>Set Clear Goals and Priorities:
To effectively manage your time, start by setting clear goals and priorities. Define what you want to achieve and identify the most important tasks that align with your goals. Prioritize your tasks based on urgency and importance, and focus on completing high-priority items first.</li><li><p>Plan and Organize Your Schedule:
Create a daily or weekly schedule to plan and organize your time effectively. Break down your tasks into smaller, manageable chunks, and allocate specific time slots for each task. Use tools such as calendars, planners, or digital task management apps to stay organized and track your progress.</p></li><li><p>Eliminate Time-Wasting Activities:
Identify and eliminate time-wasting activities that do not contribute to your goals. Minimize distractions such as excessive social media use, unnecessary meetings, or unproductive multitasking. Learn to say no to tasks that do not align with your priorities to protect your time and focus on what truly matters.</p></li><li><p>Practice Effective Time Blocking:
Time blocking is a technique where you allocate specific blocks of time for specific tasks or activities. Dedicate uninterrupted blocks of time to focus solely on important tasks, avoiding distractions. This helps improve concentration, productivity and ensures dedicated time for essential activities.</p></li><li><p>Delegate and Outsource:
Recognize that you don''t have to do everything yourself. Delegate tasks to capable team members or consider outsourcing non-core activities. Delegating not only saves time but also empowers others and promotes collaboration within your team.</p></li><li><p>Use Productivity Techniques:
Explore popular productivity techniques such as the Pomodoro Technique, which involves working in focused bursts with short breaks in between. Experiment with different techniques to find what works best for you and helps you maintain focus and productivity.</p></li><li><p>Learn to Manage Procrastination:
Procrastination can be a significant time waster. Overcome procrastination by breaking tasks into smaller, manageable steps, setting deadlines, and rewarding yourself for completing them. Practice self-discipline and develop strategies to overcome the urge to procrastinate.</p></li><li><p>Regularly Evaluate and Adjust:
Periodically evaluate your time management strategies and adjust them as needed. Assess what is working well and what needs improvement. Be open to trying new approaches and refining your techniques to optimize your time management skills continually.</p></li></ol><p>
Mastering time management is a lifelong journey that requires discipline, self-awareness, and consistent practice. By implementing the strategies discussed in this article, you can enhance your productivity, achieve your goals, and lead a more balanced and fulfilling life. Take control of your time today and unlock your full potential through effective time management.</p>',
        2, 1, 2, '2023-07-15', '2023-07-15 07:47:55', '2023-07-15 07:49:24');
INSERT INTO articles (id, title, subtitle, content, likes, dislikes, author_id, created_at, published_at, modified_at)
VALUES (6, 'The Science of Happiness', 'Unraveling the Secrets to a Fulfilling Life', '<p>Happiness is a universal pursuit, and understanding the science behind it can provide valuable insights into leading a fulfilling and joyful life. In this article, we delve into the fascinating field of positive psychology and explore the scientific principles and practices that contribute to happiness. Discover the secrets to cultivating happiness and learn how to enhance your overall well-being.</p><ol><li><p>Gratitude and Appreciation:
Research shows that cultivating gratitude and practicing appreciation can significantly impact happiness levels. Take time each day to reflect on the things you are grateful for, big or small. By acknowledging and appreciating the positive aspects of your life, you can shift your focus towards joy and contentment.</p></li><li><p>Foster Positive Relationships:
Human connections and social support are crucial to happiness. Cultivate meaningful relationships with family, friends, and loved ones. Invest time and effort in building strong connections, practicing active listening, and offering support. Surround yourself with positive and uplifting individuals who inspire and uplift you.</p></li><li><p>Pursue Meaningful Goals:
Setting and pursuing meaningful goals contributes to a sense of purpose and fulfillment. Identify your passions and values, and align your goals with them. Engage in activities that bring you joy, allow personal growth, and provide a sense of accomplishment. Striving toward meaningful goals brings a sense of purpose and happiness.</p></li><li><p>Practice Mindfulness and Self-Care:
Mindfulness involves being fully present at the moment and cultivating awareness without judgment. Engage in mindfulness practices such as meditation, deep breathing exercises, or yoga. Prioritize self-care activities that nurture your physical, mental, and emotional well-being. Taking care of yourself contributes to overall happiness and resilience.</p></li><li><p>Engage in Acts of Kindness:
Performing acts of kindness not only benefit others but also boosts your happiness. Practice random acts of kindness, whether it''s helping someone in need, offering a kind word, or volunteering for a cause you care about. Acts of kindness generate positive emotions and foster a sense of connection with others.</p></li><li><p>Cultivate Optimism and Positive Thinking:
Optimism and positive thinking have a significant impact on happiness. Challenge negative thoughts and reframe them in a positive light. Focus on solutions rather than problems, practice self-compassion, and cultivate an optimistic outlook on life. Embracing positivity can lead to greater happiness and resilience.</p></li><li><p>Engage in Flow Activities:
Flow refers to the state of complete absorption and enjoyment in an activity. Identify activities that bring you joy and allow you to experience a state of flow. It could be engaging in hobbies, pursuing creative endeavors, or participating in sports. Immersing yourself in flow activities enhances happiness and a sense of fulfillment.</p></li><li><p>Seek Personal Growth and Learning:
Continual personal growth and learning contribute to happiness and well-being. Embrace learning opportunities, whether through formal education, reading, or acquiring new skills. Set aside time for self-reflection and self-improvement, and embrace challenges as opportunities for growth.</p></li></ol><p>The science of happiness reveals that happiness is not simply a result of external circumstances but rather a combination of intentional practices, mindset, and choices. Incorporating the principles discussed in this article into your life can cultivate greater happiness and well-being. Embrace gratitude, foster positive relationships, pursue meaningful goals, practice self-care, and engage in acts of kindness. Remember, happiness is a journey, and by applying the science of happiness, you can create a life filled with joy, fulfillment, and authentic happiness.</p>',
        0, 0, 2, '2023-07-15', null, '2023-07-15 07:50:19');


INSERT INTO comments (id, user_id, article_id, message, created_at)
VALUES (1, 4, 3, 'You are a genius!', '2023-07-13');
INSERT INTO comments (id, user_id, article_id, message, created_at)
VALUES (2, 4, 3, 'This is bad lol!', '2023-07-13');
INSERT INTO comments (id, user_id, article_id, message, created_at)
VALUES (3, 4, 3, 'Wow!', '2023-07-13');
INSERT INTO comments (id, user_id, article_id, message, created_at)
VALUES (4, 4, 4, 'This is so cool! I love it!', '2023-07-15');


commit