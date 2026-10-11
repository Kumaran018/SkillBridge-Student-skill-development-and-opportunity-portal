import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initial 7 Users
const users = [
  {
    id: "usr_student_1",
    name: "Aarav Sharma",
    email: "aarav.sharma@skillbridge.edu",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Docker", "Next.js", "PostgreSQL", "Git & GitHub"],
    verifiedBadges: ["React Certified Pro", "TypeScript Certified Pro", "Hackathon Finalist '25", "Top Contributor"],
    xpPoints: 3450,
    cgpa: 9.2,
    bio: "Final-year CSE student passionate about scalable frontend architectures, design tokens, and distributed systems. Open source contributor.",
    githubUrl: "https://github.com/aarav-sharma-dev",
    college: "National Institute of Technology",
    year: "4th Year"
  },
  {
    id: "usr_student_2",
    name: "Sneha Patel",
    email: "sneha.patel@skillbridge.edu",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    skills: ["Python", "FastAPI", "Docker", "PyTorch", "SQL", "Machine Learning Basics", "Pandas & NumPy"],
    verifiedBadges: ["Python Certified Pro", "SQL Master", "Data Guild Fellow", "PyTorch Specialist"],
    xpPoints: 3240,
    cgpa: 9.4,
    bio: "AI/ML researcher and backend engineer building LLM agent workflows, RAG pipelines, and data processing systems.",
    githubUrl: "https://github.com/snehapatel-ai",
    college: "BITS Pilani",
    year: "3rd Year"
  },
  {
    id: "usr_student_3",
    name: "Rohan Kulkarni",
    email: "rohan.k@skillbridge.edu",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    skills: ["React", "Next.js", "SQL", "PostgreSQL", "Redis", "Node.js", "GraphQL"],
    verifiedBadges: ["Fullstack Pioneer", "SQL Master", "Redis Certified Pro"],
    xpPoints: 2890,
    cgpa: 8.8,
    bio: "Full-stack developer building real-time collaboration tools, distributed caching systems, and WebSocket architectures.",
    githubUrl: "https://github.com/rohank-code",
    college: "Delhi Technological University",
    year: "4th Year"
  },
  {
    id: "usr_student_4",
    name: "Ananya Iyer",
    email: "ananya.iyer@skillbridge.edu",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    skills: ["UI/UX Design Principles", "Figma", "React", "Tailwind CSS", "CSS Grid & Flexbox Mastery"],
    verifiedBadges: ["Design Systems Champion", "UX Strategist", "Tailwind Certified Pro"],
    xpPoints: 2580,
    cgpa: 9.1,
    bio: "Product designer with coding chops. Obsessed with micro-interactions, accessible UI, and scalable design systems.",
    githubUrl: "https://github.com/ananya-designs",
    college: "IIIT Hyderabad",
    year: "3rd Year"
  },
  {
    id: "usr_student_5",
    name: "Vikram Sengupta",
    email: "vikram.s@skillbridge.edu",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    skills: ["Docker", "Kubernetes", "Python", "Go (Golang)", "Linux Administration", "AWS Cloud", "Terraform"],
    verifiedBadges: ["Docker Certified Pro", "Cloud Navigator", "DevOps Prodigy", "Kubernetes Certified Pro"],
    xpPoints: 2420,
    cgpa: 8.5,
    bio: "DevOps & cloud native enthusiast. Automating infrastructure, container security, and CI/CD pipelines since day one.",
    githubUrl: "https://github.com/vikrams-devops",
    college: "Vellore Institute of Technology",
    year: "3rd Year"
  },
  {
    id: "usr_recruiter_1",
    name: "Marcus Vance",
    email: "marcus.vance@techcorp.io",
    role: "recruiter",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    skills: ["Talent Acquisition", "Technical Sourcing"],
    verifiedBadges: ["Verified Enterprise Recruiter"],
    xpPoints: 0,
    cgpa: 0,
    bio: "Lead University Talent Partner at Nova Labs & Enterprise Ventures.",
    githubUrl: "",
    company: "Nova Labs"
  },
  {
    id: "usr_admin_1",
    name: "Dr. Evelyn Reed",
    email: "admin@skillbridge.org",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    skills: ["Program Director", "Curriculum Design"],
    verifiedBadges: ["Portal SuperAdmin"],
    xpPoints: 0,
    cgpa: 0,
    bio: "Director of Industry Partnerships and Skill Verification at SkillBridge.",
    githubUrl: ""
  }
];

// 52 Unique Skills with their 5 questions each
const skillsCatalog = [
  {
    skillName: "React",
    badgeTitle: "React Certified Pro",
    questions: [
      { q: "What is the primary benefit of useMemo hook?", opts: ["Runs side effects after paint", "Memoizes calculation result between re-renders", "Optimizes CSS transitions", "Creates mutable references"], ans: 1 },
      { q: "What are React 18 Transitions used for?", opts: ["Replacing client routing", "Marking non-urgent state updates as interruptible", "Disabling useEffect", "Creating synchronous locks"], ans: 1 },
      { q: "Why should keys in list elements be stable and unique?", opts: ["Determines CSS z-index", "Enables accurate virtual DOM reconciliation", "Required for Flexbox", "Transpiles JSX to WebAssembly"], ans: 1 },
      { q: "When does the cleanup function in useEffect run?", opts: ["Only on window close", "Before unmount and before re-running on dependency change", "After initial render only", "Every tick"], ans: 1 },
      { q: "What does useCallback return?", opts: ["A memoized callback function", "A Promise", "A Web Worker thread", "A ref object"], ans: 0 }
    ]
  },
  {
    skillName: "Python",
    badgeTitle: "Python Certified Pro",
    questions: [
      { q: "What does the 'yield' keyword do inside a function?", opts: ["Terminates execution", "Turns the function into a generator that produces values lazily", "Throws an exception", "Locks GIL"], ans: 1 },
      { q: "Which data structure has O(1) average lookup time in Python?", opts: ["List", "Tuple", "Dictionary (dict)", "Linked List"], ans: 2 },
      { q: "What is the key difference between shallow and deep copy?", opts: ["Shallow is for numbers only", "Shallow copies references; deep copy clones nested objects recursively", "No difference", "Deep copy is deprecated"], ans: 1 },
      { q: "What is __init__ in Python classes?", opts: ["A destructor", "The constructor initializer method", "A static method", "A decorator"], ans: 1 },
      { q: "What does the GIL prevent in CPython?", opts: ["File I/O", "Multiple native threads executing Python bytecodes simultaneously", "Garbage collection", "Subprocess creation"], ans: 1 }
    ]
  },
  {
    skillName: "Docker",
    badgeTitle: "Docker Certified Pro",
    questions: [
      { q: "What is the primary benefit of multi-stage Docker builds?", opts: ["Spawns multiple containers", "Drastically minimizes final production image size", "Replaces Kubernetes", "Removes port bindings"], ans: 1 },
      { q: "What is the key difference between CMD and ENTRYPOINT?", opts: ["CMD is Alpine only", "ENTRYPOINT defines executable; CMD provides default overridable arguments", "CMD is build-time only", "No difference"], ans: 1 },
      { q: "Which command cleans unused containers, networks, and dangling images?", opts: ["docker clean", "docker system prune", "docker kill -9", "docker reset"], ans: 1 },
      { q: "What are Docker Volumes used for?", opts: ["Managing speaker volume", "Persisting data outside container writable layers", "Image compression", "RAM limiting"], ans: 1 },
      { q: "Which flag runs a container in detached background mode?", opts: ["-d", "-b", "--bg", "-q"], ans: 0 }
    ]
  },
  {
    skillName: "SQL",
    badgeTitle: "SQL Master",
    questions: [
      { q: "What is the difference between WHERE and HAVING?", opts: ["WHERE is numeric only", "WHERE filters rows before aggregation; HAVING filters groups after aggregation", "HAVING cannot use GROUP BY", "WHERE is deprecated"], ans: 1 },
      { q: "Which index type is default for range and equality queries in relational databases?", opts: ["B-Tree Index", "Bitmap Index", "Bloom Filter", "Spatial Index"], ans: 0 },
      { q: "What does an INNER JOIN return?", opts: ["All left rows", "Only rows matching the join predicate in both tables", "Cartesian product", "Null rows only"], ans: 1 },
      { q: "Which constraint enforces distinct values in a column?", opts: ["CHECK", "UNIQUE", "DEFAULT", "FOREIGN KEY"], ans: 1 },
      { q: "What does the ROW_NUMBER() window function do?", opts: ["Counts total rows in DB", "Assigns sequential integers to rows within a partition starting at 1", "Returns physical disk offset", "Generates UUIDs"], ans: 1 }
    ]
  },
  {
    skillName: "TypeScript",
    badgeTitle: "TypeScript Certified Pro",
    questions: [
      { q: "What is the difference between 'type' and 'interface' in TypeScript?", opts: ["They are completely incompatible", "Interfaces can be declaration merged; types support unions and primitives", "Types cannot use objects", "Interfaces are runtime only"], ans: 1 },
      { q: "What does the 'keyof' operator produce?", opts: ["Object values", "A union of string/numeric literal keys of a type", "Array length", "A new class"], ans: 1 },
      { q: "What does 'unknown' represent compared to 'any'?", opts: ["Same as any", "Type-safe counterpart to any that requires type narrowing before use", "Only for null values", "A runtime error"], ans: 1 },
      { q: "What does the 'readonly' modifier do on properties?", opts: ["Encrypts property", "Prevents reassignment after initialization", "Hides property from console", "Makes it optional"], ans: 1 },
      { q: "What is a generic type in TypeScript?", opts: ["A type without properties", "A parameterized reusable type defined with angle brackets <T>", "A JavaScript global", "A built-in enum"], ans: 1 }
    ]
  },
  {
    skillName: "JavaScript (ES6+)",
    badgeTitle: "JavaScript Certified Pro",
    questions: [
      { q: "What is the JavaScript Event Loop responsible for?", opts: ["Rendering CSS", "Coordinating synchronous code execution and asynchronous callbacks in the queue", "Compiling HTML", "Garbage collection only"], ans: 1 },
      { q: "What is closure in JavaScript?", opts: ["Closing the browser tab", "A function that retains access to its lexical scope even when executed outside that scope", "A try-catch block", "A sealed object"], ans: 1 },
      { q: "What does Promise.all() do when one promise rejects?", opts: ["Ignores rejection", "Immediately rejects with that reason", "Waits for remaining promises", "Retries indefinitely"], ans: 1 },
      { q: "What is the difference between == and ===?", opts: ["=== performs type coercion", "=== checks both value and type without coercion", "No difference in ES6", "== is faster"], ans: 1 },
      { q: "What does Array.prototype.reduce() return?", opts: ["Always an array", "A single accumulated value resulting from the reducer callback", "A boolean", "A string only"], ans: 1 }
    ]
  },
  {
    skillName: "Node.js",
    badgeTitle: "Node.js Certified Pro",
    questions: [
      { q: "What engine powers Node.js under the hood?", opts: ["SpiderMonkey", "V8 Engine", "JavaScriptCore", "Chakra"], ans: 1 },
      { q: "What does process.nextTick() do?", opts: ["Runs on the next hour", "Schedules callback to run before the next event loop iteration", "Sleeps the process", "Forces garbage collection"], ans: 1 },
      { q: "Why should synchronous fs functions like readFileSync be avoided in web servers?", opts: ["They corrupt data", "They block the entire Node.js single-threaded event loop", "They require root access", "They are deprecated"], ans: 1 },
      { q: "What is libuv in Node.js architecture?", opts: ["A package manager", "A multi-platform C library providing asynchronous I/O and thread pooling", "A testing framework", "A JSX compiler"], ans: 1 },
      { q: "How do Node.js Streams improve memory efficiency?", opts: ["Compressing variables", "Processing data piece by piece (chunking) without loading whole files into RAM", "Using swap space", "Disabling buffers"], ans: 1 }
    ]
  },
  {
    skillName: "Next.js",
    badgeTitle: "Next.js Certified Pro",
    questions: [
      { q: "What is the key benefit of React Server Components (RSC) in Next.js App Router?", opts: ["Zero JavaScript bundle sent to the client for server-rendered components", "Automatic CSS conversion", "Replaces REST APIs with XML", "Disables hydration"], ans: 0 },
      { q: "What does the 'use client' directive declare in Next.js?", opts: ["Declares client boundary where interactive hooks like useState/useEffect can be used", "Imports client secret keys", "Sets browser cookies", "Enables PWA"], ans: 0 },
      { q: "What is Incremental Static Regeneration (ISR)?", opts: ["Rebuilding entire site on every request", "Updating specific static pages in the background without full rebuild", "Deleting static cache", "Running client web workers"], ans: 1 },
      { q: "Where are Server Actions executed in Next.js?", opts: ["Inside the user browser", "Securely on the server", "Inside Edge CDN cache", "On local device disk"], ans: 1 },
      { q: "Which component optimizes images with lazy loading and WebP formats?", opts: ["<img-next>", "<Image /> from 'next/image'", "<Picture />", "<Graphic />"], ans: 1 }
    ]
  },
  {
    skillName: "Kubernetes",
    badgeTitle: "Kubernetes Certified Pro",
    questions: [
      { q: "What is the smallest deployable computing unit in Kubernetes?", opts: ["Node", "Pod", "Cluster", "Service"], ans: 1 },
      { q: "What is the primary role of a Kubernetes Deployment?", opts: ["Managing hardware firmware", "Declaratively managing Pods, replicas, and rolling updates", "Configuring DNS records", "Encrypting database volumes"], ans: 1 },
      { q: "What component is the distributed key-value store in a Kubernetes control plane?", opts: ["Redis", "etcd", "MongoDB", "Consul"], ans: 1 },
      { q: "What does a Kubernetes Service do?", opts: ["Reboots nodes", "Provides an abstract stable network endpoint and load balancing for a set of Pods", "Installs Docker", "Generates SSL certificates"], ans: 1 },
      { q: "What does Horizontal Pod Autoscaler (HPA) adjust?", opts: ["CPU clock speed", "Number of Pod replicas based on observed CPU/memory utilization", "Disk block size", "Network bandwidth limits"], ans: 1 }
    ]
  },
  {
    skillName: "Git & GitHub",
    badgeTitle: "Git Certified Pro",
    questions: [
      { q: "What does 'git rebase' do compared to 'git merge'?", opts: ["Deletes commit history", "Re-applies commits on top of another base tip creating a linear commit history", "Creates an octopus merge commit", "Disables pull requests"], ans: 1 },
      { q: "What does 'git cherry-pick' do?", opts: ["Deletes remote branch", "Applies the changes introduced by a specific existing commit onto the current branch", "Picks random commits", "Resets staging area"], ans: 1 },
      { q: "What is the purpose of the staging area in Git?", opts: ["Storing backup files", "Allowing developers to format and review changes before committing", "Tracking deleted repos", "Encrypting passwords"], ans: 1 },
      { q: "What does 'git stash' do?", opts: ["Permanently deletes uncommitted work", "Temporarily shelves uncommitted changes so you can work on another branch", "Creates a release tag", "Forces push to main"], ans: 1 },
      { q: "What is a detached HEAD state in Git?", opts: ["A corrupted repo", "HEAD points directly to a commit rather than a branch reference", "A deleted commit", "Merge conflict"], ans: 1 }
    ]
  },
  {
    skillName: "Go (Golang)",
    badgeTitle: "Go Certified Pro",
    questions: [
      { q: "What are goroutines in Go?", opts: ["Heavyweight OS processes", "Extremely lightweight threads of execution managed by the Go runtime", "Database transactions", "Garbage collection loops"], ans: 1 },
      { q: "How do goroutines communicate safely in Go?", opts: ["Shared global pointers", "Channels", "Mutex locks only", "Filesystem writes"], ans: 1 },
      { q: "What does the 'defer' keyword do in Go?", opts: ["Delays execution until the surrounding function returns", "Cancels function execution", "Runs code in background", "Throws panic"], ans: 0 },
      { q: "Does Go support classical class-based inheritance?", opts: ["Yes with class keyword", "No, Go uses composition and structural interfaces", "Yes with virtual methods", "Only through C extensions"], ans: 1 },
      { q: "What is the zero value of an uninitialized pointer in Go?", opts: ["0", "nil", "undefined", "false"], ans: 1 }
    ]
  },
  {
    skillName: "Rust",
    badgeTitle: "Rust Certified Pro",
    questions: [
      { q: "What core mechanism provides memory safety without a garbage collector in Rust?", opts: ["Virtual Machine", "Ownership and Borrow Checker system", "Automatic reference counting only", "Hardware page tables"], ans: 1 },
      { q: "What is the difference between String and &str in Rust?", opts: ["No difference", "String is an allocated growable heap buffer; &str is an immutable string slice", "String is deprecated", "&str is mutable heap memory"], ans: 1 },
      { q: "What do the Option and Result enums replace in Rust?", opts: ["For loops", "Null pointers and runtime unhandled exceptions", "Structs", "Macros"], ans: 1 },
      { q: "What does the 'mut' keyword declare?", opts: ["Immutable reference", "A mutable variable or binding", "A multithreaded channel", "A module"], ans: 1 },
      { q: "What are lifetimes ('a) used for in Rust?", opts: ["Garbage collection timer", "Helping compiler ensure that references do not outlive the data they point to", "Thread sleep durations", "Process uptime tracking"], ans: 1 }
    ]
  },
  {
    skillName: "AWS Cloud",
    badgeTitle: "AWS Cloud Practitioner",
    questions: [
      { q: "Which AWS service provides serverless event-driven compute?", opts: ["Amazon EC2", "AWS Lambda", "Amazon EBS", "AWS Direct Connect"], ans: 1 },
      { q: "What is the primary function of Amazon S3?", opts: ["Relational database", "Scalable object storage for files and media", "Load balancer", "DNS management"], ans: 1 },
      { q: "What AWS service manages domain names and DNS routing?", opts: ["Amazon Route 53", "Amazon VPC", "AWS IAM", "AWS CloudTrail"], ans: 0 },
      { q: "What is an AWS IAM Role?", opts: ["An IAM user with permanent password", "An identity with permission policies that can be assumed by trusted entities/services", "An EC2 instance type", "A billing account"], ans: 1 },
      { q: "Which AWS service provides managed PostgreSQL and MySQL databases?", opts: ["Amazon DynamoDB", "Amazon RDS", "Amazon Redshift", "AWS Elastic Beanstalk"], ans: 1 }
    ]
  },
  {
    skillName: "PostgreSQL",
    badgeTitle: "PostgreSQL Specialist",
    questions: [
      { q: "What datatype in PostgreSQL stores and indexes structured JSON with binary efficiency?", opts: ["TEXT", "JSONB", "VARCHAR", "BYTEA"], ans: 1 },
      { q: "What is MVCC (Multi-Version Concurrency Control) in PostgreSQL?", opts: ["Database replication tool", "Concurrency mechanism allowing readers not to block writers and vice versa", "Password hash algorithm", "Connection pooler"], ans: 1 },
      { q: "Which command analyzes query execution plans with actual runtime metrics?", opts: ["SHOW QUERY", "EXPLAIN ANALYZE", "SELECT PROFILE", "DESCRIBE PLAN"], ans: 1 },
      { q: "What are CTEs (Common Table Expressions) introduced with?", opts: ["WITH clause", "HAVING clause", "AS clause", "JOIN clause"], ans: 0 },
      { q: "What does the VACUUM command do in PostgreSQL?", opts: ["Deletes all tables", "Reclaims storage occupied by dead row tuples", "Resets server root password", "Encrypts tablespaces"], ans: 1 }
    ]
  },
  {
    skillName: "MongoDB",
    badgeTitle: "MongoDB Certified Pro",
    questions: [
      { q: "What document format does MongoDB use to store data internally?", opts: ["XML", "BSON (Binary JSON)", "YAML", "CSV"], ans: 1 },
      { q: "What is an ObjectId in MongoDB?", opts: ["An integer auto-increment", "A 12-byte BSON type uniquely identifying documents", "A database name", "A username"], ans: 1 },
      { q: "Which stage in the aggregation pipeline filters documents similar to find()?", opts: ["$project", "$match", "$group", "$sort"], ans: 1 },
      { q: "What is a Replica Set in MongoDB?", opts: ["A single standalone node", "A group of mongod instances that maintain the same data set for high availability", "A backup zip file", "A sharded router"], ans: 1 },
      { q: "What is Sharding used for in MongoDB?", opts: ["Horizontal scaling and partitioning data across multiple machines", "In-memory caching", "Generating SSL keys", "Encrypting disk"], ans: 0 }
    ]
  },
  {
    skillName: "Redis",
    badgeTitle: "Redis Certified Pro",
    questions: [
      { q: "Where does Redis primarily store its data?", opts: ["On spinning magnetic hard disks", "In-memory (RAM) with optional disk persistence", "On tape backups", "In browser cache"], ans: 1 },
      { q: "Which data structure in Redis keeps elements ordered by a floating-point score?", opts: ["List", "Sorted Set (ZSET)", "Hash", "Bitmap"], ans: 1 },
      { q: "What persistence option in Redis writes every write command to an append log?", opts: ["RDB snapshots", "AOF (Append Only File)", "Swap cache", "RAID 0"], ans: 1 },
      { q: "What is the typical time complexity for GET/SET operations in Redis?", opts: ["O(N)", "O(1)", "O(log N)", "O(N^2)"], ans: 1 },
      { q: "What messaging pattern does Redis Pub/Sub implement?", opts: ["Message queuing with guaranteed ack", "Publish/Subscribe publisher-subscriber paradigm", "Email notifications", "FTP file transfers"], ans: 1 }
    ]
  },
  {
    skillName: "GraphQL",
    badgeTitle: "GraphQL Certified Pro",
    questions: [
      { q: "What major problem of REST APIs does GraphQL primarily solve?", opts: ["Requires XML", "Over-fetching and under-fetching of data", "Disables HTTPS", "Limits payload size to 1KB"], ans: 1 },
      { q: "What is a Resolver in GraphQL?", opts: ["A CSS preprocessor", "A function that generates the response for a particular GraphQL schema field", "A database driver", "A route proxy"], ans: 1 },
      { q: "Which operation in GraphQL is used to modify or insert data?", opts: ["Query", "Mutation", "Subscription", "Fragment"], ans: 1 },
      { q: "What operation provides real-time streaming updates from server to client?", opts: ["Query", "Subscription", "Directive", "Schema"], ans: 1 },
      { q: "What is the N+1 problem in GraphQL resolvers?", opts: ["A compiler crash", "Executing one query for a parent item and N separate queries for its children", "Syntax error in fragments", "Network timeout"], ans: 1 }
    ]
  },
  {
    skillName: "Tailwind CSS",
    badgeTitle: "Tailwind CSS Certified Pro",
    questions: [
      { q: "What architectural approach does Tailwind CSS advocate?", opts: ["BEM naming convention", "Utility-first CSS classes", "Inline HTML style tags", "Pure semantic CSS tags"], ans: 1 },
      { q: "How does Tailwind remove unused CSS classes in production builds?", opts: ["Runtime regex parsing", "Purging / Content scanner that scans files for class names at build time", "Browser discarding", "Server-side rendering"], ans: 1 },
      { q: "What prefix in Tailwind applies styles on hover state?", opts: ["mouse:", "hover:", "active:", "focus:"], ans: 1 },
      { q: "What is the mobile-first breakpoint convention in Tailwind?", opts: ["Desktop styles applied by default; max-w for mobile", "Unprefixed utilities apply to mobile; min-width prefixes (sm:, md:) apply to larger screens", "Mobile styles require mobile: prefix", "No breakpoints"], ans: 1 },
      { q: "Where are custom colors, fonts, and theme extensions defined in Tailwind v3?", opts: ["tailwind.config.js", "styles.scss", "package.json", "index.html"], ans: 0 }
    ]
  },
  {
    skillName: "FastAPI",
    badgeTitle: "FastAPI Certified Pro",
    questions: [
      { q: "Which Python data validation library powers FastAPI?", opts: ["Marshmallow", "Pydantic", "Django ORM", "Cerberus"], ans: 1 },
      { q: "What ASGI server is standardly used to run FastAPI applications?", opts: ["Gunicorn", "Uvicorn", "Apache", "Flask"], ans: 1 },
      { q: "What automatic feature does FastAPI generate at /docs?", opts: ["PHPMyAdmin", "Interactive OpenAPI (Swagger UI) documentation", "Unit test report", "Server metrics"], ans: 1 },
      { q: "How are asynchronous route handlers defined in FastAPI?", opts: ["def async_route()", "async def handler()", "@async decorator", "threading.Thread"], ans: 1 },
      { q: "What mechanism handles authentication and shared logic injection in FastAPI?", opts: ["Middleware only", "Dependency Injection system using Depends()", "Global variables", "Class inheritance"], ans: 1 }
    ]
  },
  {
    skillName: "Linux Administration",
    badgeTitle: "Linux SysAdmin Certified Pro",
    questions: [
      { q: "Which command shows running processes with dynamic real-time resource usage?", opts: ["ps", "top / htop", "ls", "df"], ans: 1 },
      { q: "What does 'chmod 755 script.sh' grant to the file owner?", opts: ["Read only", "Read, write, and execute permissions (rwxr-xr-x)", "Execute only", "No permissions"], ans: 1 },
      { q: "Which system service manager is standard in modern distributions for managing daemons?", opts: ["SysVinit", "systemd", "Upstart", "cron"], ans: 1 },
      { q: "Which command checks disk space utilization across mounted filesystems?", opts: ["free -m", "df -h", "du -sh", "fdisk -l"], ans: 1 },
      { q: "What file contains the mapping of hostnames to IP addresses locally?", opts: ["/etc/fstab", "/etc/hosts", "/etc/passwd", "/etc/resolv.conf"], ans: 1 }
    ]
  }
];

// Additional skills to make 52 total skills
const additionalSkills = [
  "Java", "C++", "Vue.js", "Angular", "Django", "Flask", "Cybersecurity Fundamentals",
  "UI/UX Design Principles", "Data Structures & Algorithms", "Machine Learning Basics",
  "Deep Learning with PyTorch", "TensorFlow", "Apache Kafka", "CI/CD & GitHub Actions",
  "Terraform", "WebSockets & Real-Time Systems", "Microservices Architecture", "RESTful API Design",
  "React Native", "Flutter", "Swift (iOS)", "Kotlin (Android)", "System Design",
  "Prompt Engineering & LLM APIs", "Web3 & Solidity", "Apache Spark", "Pandas & NumPy",
  "OAuth & JWT Authentication", "CSS Grid & Flexbox Mastery", "Web Performance & Core Web Vitals",
  "Unit Testing (Jest & Vitest)", "Nginx & Reverse Proxies"
];

additionalSkills.forEach((skillName, index) => {
  skillsCatalog.push({
    skillName,
    badgeTitle: `${skillName.replace(/\s+/g, ' ')} Specialist`,
    questions: [
      { q: `What is a foundational best practice when engineering scalable systems with ${skillName}?`, opts: ["Ignoring memory leaks", "Separating concerns, modularizing logic, and profiling bottlenecks", "Hardcoding production API keys", "Disabling automated tests"], ans: 1 },
      { q: `Which of the following describes an anti-pattern when working with ${skillName}?`, opts: ["Writing unit tests", "Blocking asynchronous event loops or tightly coupling state", "Using semantic versions", "Enforcing strict typing"], ans: 1 },
      { q: `How is error handling and observability standardly managed in production ${skillName} workloads?`, opts: ["Silently catching exceptions without logging", "Structured JSON logging, telemetry metrics, and graceful degradation", "Printing to STDOUT only", "Rebooting nodes on error"], ans: 1 },
      { q: `What optimization technique drastically improves execution efficiency in ${skillName}?`, opts: ["Excessive nested loops", "Appropriate indexing, caching, and algorithmic complexity minimization", "Disabling garbage collection", "Synchronous network calls"], ans: 1 },
      { q: `How does continuous integration benefit projects developed using ${skillName}?`, opts: ["Slowing down releases", "Automating testing, linting, and build verification on every pull request", "Replacing developers", "Removing version control"], ans: 1 }
    ]
  });
});

console.log(`Generated ${skillsCatalog.length} Skill Quizzes.`);

// Generate 55+ Opportunities
const companies = [
  { name: "Nova Labs", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80", loc: "Bengaluru (Hybrid)" },
  { name: "Synthetix AI", logo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&auto=format&fit=crop&q=80", loc: "Remote" },
  { name: "Nexus Financial", logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80", loc: "Mumbai (Hybrid)" },
  { name: "DataPulse Systems", logo: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=100&auto=format&fit=crop&q=80", loc: "Remote" },
  { name: "CloudScale Infra", logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&auto=format&fit=crop&q=80", loc: "Hyderabad (Hybrid)" },
  { name: "Aura Creative Studio", logo: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=100&auto=format&fit=crop&q=80", loc: "Remote" },
  { name: "Stripe", logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&auto=format&fit=crop&q=80", loc: "Bengaluru (Hybrid)" },
  { name: "Razorpay", logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&auto=format&fit=crop&q=80", loc: "Bengaluru (Hybrid)" },
  { name: "Databricks", logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&auto=format&fit=crop&q=80", loc: "Remote" },
  { name: "Vercel", logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80", loc: "Remote" },
  { name: "Supabase", logo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&auto=format&fit=crop&q=80", loc: "Remote" },
  { name: "Postman", logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&auto=format&fit=crop&q=80", loc: "Bengaluru (Hybrid)" }
];

const oppTitles = [
  { t: "Frontend Engineering Intern (React & Next.js)", type: "Internship", st: "₹45,000 / month", sk: ["React", "TypeScript", "Tailwind CSS"], dur: "6 Months" },
  { t: "AI Agent & Backend Micro-Gig", type: "Micro-Gig", st: "₹25,000 project fee", sk: ["Python", "FastAPI", "Docker"], dur: "3 Weeks" },
  { t: "Global FinTech Hackathon 2026", type: "Hackathon", st: "₹3,50,000 Prize Pool", sk: ["React", "SQL", "Docker"], dur: "48 Hours" },
  { t: "Database Optimization & Analytics Micro-Gig", type: "Micro-Gig", st: "₹18,000 project fee", sk: ["SQL", "Python"], dur: "2 Weeks" },
  { t: "Cloud & DevOps Apprenticeship", type: "Internship", st: "₹40,000 / month", sk: ["Docker", "Linux Administration", "Python"], dur: "6 Months" },
  { t: "UI Design Systems & Interaction Micro-Gig", type: "Micro-Gig", st: "₹20,000 project fee", sk: ["React", "Tailwind CSS", "UI/UX Design Principles"], dur: "2 Weeks" },
  { t: "Full-Stack Web3 & Smart Contracts Hackathon", type: "Hackathon", st: "₹5,00,000 Prize Pool", sk: ["React", "Web3 & Solidity", "TypeScript"], dur: "72 Hours" },
  { t: "Distributed Systems & Golang Apprenticeship", type: "Internship", st: "₹50,000 / month", sk: ["Go (Golang)", "Docker", "PostgreSQL"], dur: "6 Months" },
  { t: "LLM Fine-Tuning & RAG Pipeline Micro-Gig", type: "Micro-Gig", st: "₹35,000 project fee", sk: ["Python", "Prompt Engineering & LLM APIs", "FastAPI"], dur: "4 Weeks" },
  { t: "Mobile App Development Intern (React Native)", type: "Internship", st: "₹42,000 / month", sk: ["React", "React Native", "TypeScript"], dur: "6 Months" },
  { t: "Kubernetes Cluster Hardening Micro-Gig", type: "Micro-Gig", st: "₹28,000 project fee", sk: ["Kubernetes", "Docker", "Linux Administration"], dur: "3 Weeks" },
  { t: "Cybersecurity & Vulnerability Assessment Hackathon", type: "Hackathon", st: "₹4,00,000 Prize Pool", sk: ["Cybersecurity Fundamentals", "Linux Administration", "Python"], dur: "48 Hours" },
  { t: "Data Engineering & Stream Processing Intern", type: "Internship", st: "₹48,000 / month", sk: ["Apache Kafka", "Python", "SQL"], dur: "6 Months" },
  { t: "GraphQL Schema & Microservices Integration Gig", type: "Micro-Gig", st: "₹22,000 project fee", sk: ["GraphQL", "Node.js", "TypeScript"], dur: "2 Weeks" },
  { t: "Redis Distributed Caching Optimization Gig", type: "Micro-Gig", st: "₹20,000 project fee", sk: ["Redis", "Node.js", "SQL"], dur: "2 Weeks" },
  { t: "Rust High-Performance Systems Internship", type: "Internship", st: "₹55,000 / month", sk: ["Rust", "Linux Administration", "Docker"], dur: "6 Months" },
  { t: "Enterprise Java & Spring Boot Micro-Gig", type: "Micro-Gig", st: "₹25,000 project fee", sk: ["Java", "SQL", "Docker"], dur: "3 Weeks" },
  { t: "Next.js 15 Server Components Migration Sprint", type: "Micro-Gig", st: "₹30,000 project fee", sk: ["Next.js", "React", "TypeScript"], dur: "3 Weeks" },
  { t: "Computer Vision & PyTorch Model Training Sprint", type: "Micro-Gig", st: "₹32,000 project fee", sk: ["Deep Learning with PyTorch", "Python", "Pandas & NumPy"], dur: "4 Weeks" },
  { t: "National Collegiate AI Innovation Hackathon", type: "Hackathon", st: "₹6,00,000 Prize Pool", sk: ["Python", "FastAPI", "React"], dur: "48 Hours" }
];

const opportunities = [];
let oppCounter = 1;

for (let cycle = 0; cycle < 3; cycle++) {
  for (let i = 0; i < oppTitles.length; i++) {
    if (opportunities.length >= 54) break;
    const base = oppTitles[i];
    const company = companies[(i + cycle) % companies.length];
    const oppId = `opp_${oppCounter++}`;
    
    // Assign sample applicants for early opps
    const applicants = [];
    if (oppCounter <= 8) {
      applicants.push({
        studentId: "usr_student_1",
        studentName: "Aarav Sharma",
        email: "aarav.sharma@skillbridge.edu",
        appliedDate: "2026-10-02",
        status: oppCounter === 2 ? "Shortlisted" : oppCounter === 4 ? "Selected" : "Applied",
        matchScore: Math.floor(Math.random() * 15 + 85)
      });
    }
    if (oppCounter % 3 === 0) {
      applicants.push({
        studentId: "usr_student_2",
        studentName: "Sneha Patel",
        email: "sneha.patel@skillbridge.edu",
        appliedDate: "2026-10-04",
        status: oppCounter === 6 ? "Selected" : "Applied",
        matchScore: Math.floor(Math.random() * 15 + 85)
      });
    }

    opportunities.push({
      id: oppId,
      title: cycle > 0 ? `${base.t} (Cohort ${cycle + 1})` : base.t,
      company: company.name,
      logo: company.logo,
      location: company.loc,
      type: base.type,
      requiredSkills: base.sk,
      stipend: base.st,
      duration: base.dur,
      deadline: `2026-11-${String((i % 25) + 5).padStart(2, '0')}`,
      description: `Join ${company.name} to contribute to high-impact projects requiring strong fundamentals in ${base.sk.join(', ')}. Mentorship from principal engineers provided.`,
      postedDate: "2026-10-01",
      applicants
    });
  }
}

console.log(`Generated ${opportunities.length} Opportunities.`);

// Generate 55+ Learning Resources
const learningResources = [];
let resCounter = 1;

const resourceTemplates = [
  { provider: "Official Documentation", type: "Interactive Guide", diff: "Beginner", dur: "4 Hours" },
  { provider: "freeCodeCamp", type: "Hands-on Project", diff: "Beginner", dur: "8 Hours" },
  { provider: "Frontend Masters", type: "Deep Dive Video Series", diff: "Advanced", dur: "6 Hours" },
  { provider: "MIT OpenCourseWare", type: "Academic Lecture Series", diff: "Intermediate", dur: "12 Hours" },
  { provider: "Harvard CS50", type: "Interactive Lab", diff: "Beginner", dur: "10 Hours" },
  { provider: "FullStackOpen", type: "Production-grade Course", diff: "Intermediate", dur: "15 Hours" },
  { provider: "Coursera & DeepLearning.AI", type: "Specialization Track", diff: "Advanced", dur: "18 Hours" }
];

skillsCatalog.forEach((skill, idx) => {
  const tmpl = resourceTemplates[idx % resourceTemplates.length];
  learningResources.push({
    id: `res_${resCounter++}`,
    skillName: skill.skillName,
    courseTitle: `${skill.skillName} Zero to Production Mastery`,
    url: `https://github.com/topics/${skill.skillName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    difficulty: tmpl.diff,
    provider: tmpl.provider,
    duration: tmpl.dur,
    type: tmpl.type
  });
});

// Add extra resources to guarantee 55+
for (let i = 0; learningResources.length < 56; i++) {
  const skill = skillsCatalog[i % skillsCatalog.length];
  learningResources.push({
    id: `res_${resCounter++}`,
    skillName: skill.skillName,
    courseTitle: `Advanced Architectural Patterns in ${skill.skillName}`,
    url: `https://dev.to/t/${skill.skillName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
    difficulty: "Advanced",
    provider: "SkillBridge Engineering Guild",
    duration: "5 Hours",
    type: "Architecture Deep-Dive"
  });
}

console.log(`Generated ${learningResources.length} Learning Resources.`);

// Build final seedData.js content
const formattedSkillQuizzes = skillsCatalog.map((s, idx) => ({
  id: `quiz_${s.skillName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
  skillName: s.skillName,
  badgeTitle: s.badgeTitle,
  xpReward: 100,
  timeLimitSeconds: 180,
  description: `5-question timed benchmark covering fundamental and advanced concepts in ${s.skillName}.`,
  questions: s.questions.map((q, qIdx) => ({
    id: `q_${idx}_${qIdx}`,
    question: q.q,
    options: q.opts,
    correctAnswer: q.ans
  }))
}));

const outputCode = `export const initialSeedData = ${JSON.stringify({
  users,
  opportunities,
  skillQuizzes: formattedSkillQuizzes,
  learningResources
}, null, 2)};
`;

const targetPath = path.join(__dirname, 'seedData.js');
fs.writeFileSync(targetPath, outputCode, 'utf-8');
console.log(`✅ Successfully wrote expanded seedData.js to ${targetPath}`);
