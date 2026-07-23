import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Code2,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  ChevronDown,
} from 'lucide-react';
import Badge from '../components/ui/Badge';

const tutorialsData = {
  java: {
  name: "Java",
  subtitle: "Object-Oriented Programming Language",
  paradigm: "Object-Oriented",
  typing: "Static / Strong",
  topics: [
    {
      id: "java-introduction",
      title: "Introduction to Java",
      difficulty: "Easy",
      description:
        "Java is a high-level, object-oriented, platform-independent programming language developed by Sun Microsystems (now Oracle). Java follows the principle of 'Write Once, Run Anywhere (WORA)', meaning compiled Java code can run on any platform that has a Java Virtual Machine (JVM). It is widely used in enterprise applications, Android development, backend systems, cloud computing, and distributed applications.",

      faqs: [
        {
          question: "Why is Java platform independent?",
          answer:
            "Java source code is compiled into bytecode, which runs on the JVM. Since JVM is available for multiple operating systems, Java programs can execute without modification."
        },
        {
          question: "What are the main features of Java?",
          answer:
            "Platform Independent, Object-Oriented, Robust, Secure, Multithreaded, Portable, Architecture Neutral, High Performance (through JIT), Distributed, and Dynamic."
        },
        {
          question: "Why is Java called both compiled and interpreted?",
          answer:
            "Java code is first compiled into bytecode using javac, then the JVM interprets or JIT-compiles the bytecode into machine code during execution."
        }
      ]
    },

    {
      id: "jvm-jre-jdk",
      title: "JVM, JRE & JDK",
      difficulty: "Easy",
      description:
        "JDK (Java Development Kit) contains everything needed to develop Java applications. JRE (Java Runtime Environment) provides libraries and JVM required to run Java programs. JVM (Java Virtual Machine) executes Java bytecode and provides platform independence.",

      faqs: [
        {
          question: "Difference between JVM, JRE and JDK?",
          answer:
            "JVM executes bytecode. JRE contains JVM and libraries required to run Java applications. JDK contains JRE plus development tools like javac, debugger, and documentation generator."
        },
        {
          question: "Can we run Java without JDK?",
          answer:
            "Yes. End users only need JRE to execute Java applications. Developers require JDK."
        },
        {
          question: "What is the responsibility of JVM?",
          answer:
            "JVM loads classes, verifies bytecode, manages memory, performs garbage collection, executes bytecode, and ensures platform independence."
        }
      ]
    },

    {
      id: "java-datatypes",
      title: "Data Types",
      difficulty: "Easy",
      description:
        "A data type specifies the type of value a variable can store. Java provides primitive data types and non-primitive (reference) data types.",

      faqs: [
        {
          question: "How many primitive data types are there in Java?",
          answer:
            "There are eight primitive data types: byte, short, int, long, float, double, char, and boolean."
        },
        {
          question: "Difference between primitive and non-primitive data types?",
          answer:
            "Primitive types store actual values and have fixed sizes. Non-primitive types store references to objects and can have methods and constructors."
        },
        {
          question: "Default value of primitive data types?",
          answer:
            "byte, short, int = 0, long = 0L, float = 0.0f, double = 0.0, char = '\\u0000', boolean = false."
        }
      ]
    },

    {
      id: "variables",
      title: "Variables",
      difficulty: "Easy",
      description:
        "A variable is a named memory location used to store data. Java supports local variables, instance variables, and static variables.",

      faqs: [
        {
          question: "Types of variables in Java?",
          answer:
            "Local variables, Instance variables, and Static (Class) variables."
        },
        {
          question: "Where are local variables stored?",
          answer:
            "Local variables are stored in the stack memory and exist only during method execution."
        },
        {
          question: "Difference between instance and static variables?",
          answer:
            "Instance variables belong to an object, whereas static variables belong to the class and are shared among all objects."
        }
      ]
    },

    {
      id: "operators",
      title: "Operators",
      difficulty: "Easy",
      description:
        "Operators are special symbols that perform operations on operands. Java provides arithmetic, relational, logical, assignment, bitwise, unary, ternary, and shift operators.",

      faqs: [
        {
          question: "What is the difference between == and equals()?",
          answer:
            "== compares references for objects and values for primitives, whereas equals() compares object contents when overridden."
        },
        {
          question: "What is the ternary operator?",
          answer:
            "The ternary operator (condition ? value1 : value2) is a shorthand for if-else."
        },
        {
          question: "Difference between & and &&?",
          answer:
            "& always evaluates both operands, whereas && uses short-circuit evaluation and skips the second operand if the first is false."
        }
      ]
    },

    {
      id: "constructors",
      title: "Constructors",
      difficulty: "Easy",
      description:
        "A constructor is a special method that initializes objects. It has the same name as the class and does not have any return type. Java supports default and parameterized constructors.",

      faqs: [
        {
          question: "What is a constructor?",
          answer:
            "A constructor is a special method automatically invoked when an object is created to initialize the object's state."
        },
        {
          question: "Can constructors be overloaded?",
          answer:
            "Yes. Java supports constructor overloading by defining multiple constructors with different parameter lists."
        },
        {
          question: "Can a constructor be final, static or abstract?",
          answer:
            "No. Constructors cannot be final, static, or abstract because they are not inherited or overridden."
        }
        
      ]
      
    },
    {
  id: "this-keyword",
  title: "this Keyword",
  difficulty: "Easy",
  description:
    "The 'this' keyword refers to the current object of a class. It is used to differentiate instance variables from local variables, invoke current class methods, invoke another constructor of the same class using this(), and pass the current object as an argument.",

  faqs: [
    {
      question: "What is the purpose of the this keyword?",
      answer:
        "The this keyword refers to the current object and is used to access instance variables, methods, constructors, and the current object."
    },
    {
      question: "Can we use this() and super() together in a constructor?",
      answer:
        "No. Both must be the first statement inside a constructor, so only one of them can be used."
    },
    {
      question: "Can this keyword be used inside a static method?",
      answer:
        "No. Static methods belong to the class, not an object, so there is no current object."
    }
  ]
},

{
  id: "super-keyword",
  title: "super Keyword",
  difficulty: "Easy",
  description:
    "The super keyword refers to the immediate parent class object. It is used to access parent class variables, invoke parent class methods, and call parent class constructors.",

  faqs: [
    {
      question: "What is the difference between this and super?",
      answer:
        "this refers to the current class object, whereas super refers to the immediate parent class object."
    },
    {
      question: "Why is super() used?",
      answer:
        "super() invokes the constructor of the parent class and helps initialize inherited members."
    },
    {
      question: "Can super() be called multiple times inside a constructor?",
      answer:
        "No. It can only be called once and must be the first statement."
    }
  ]
},

{
  id: "static-keyword",
  title: "Static Keyword",
  difficulty: "Easy",
  description:
    "The static keyword makes a member belong to the class instead of individual objects. Static members are created only once and shared among all objects of the class.",

  faqs: [
    {
      question: "What can be declared static in Java?",
      answer:
        "Variables, methods, nested classes, and blocks can be declared static."
    },
    {
      question: "Can a static method access non-static members?",
      answer:
        "No. A static method cannot directly access instance variables or instance methods because they belong to an object."
    },
    {
      question: "Why is the main method static?",
      answer:
        "The JVM calls main() before creating any object, so it must be static."
    }
  ]
},

{
  id: "final-keyword",
  title: "Final Keyword",
  difficulty: "Easy",
  description:
    "The final keyword is used to restrict modification. A final variable cannot be reassigned, a final method cannot be overridden, and a final class cannot be inherited.",

  faqs: [
    {
      question: "What is the difference between final, finally, and finalize()?",
      answer:
        "final is a keyword, finally is an exception handling block, and finalize() is a garbage collection method."
    },
    {
      question: "Can a final variable be initialized later?",
      answer:
        "Yes. A blank final variable can be initialized once inside a constructor."
    },
    {
      question: "Why is String immutable if it's final?",
      answer:
        "String immutability is implemented internally. The final keyword only prevents inheritance of the String class."
    }
  ]
},

{
  id: "oops",
  title: "Object-Oriented Programming (OOP)",
  description:
    "Object-Oriented Programming organizes software around objects rather than functions. Java supports four major OOP principles: Encapsulation, Inheritance, Polymorphism, and Abstraction. OOP improves code reusability, maintainability, scalability, and modularity.",

  faqs: [
    {
      question: "What are the four pillars of OOP?",
      answer:
        "Encapsulation, Inheritance, Polymorphism, and Abstraction."
    },
    {
      question: "Why is Java called an object-oriented language?",
      answer:
        "Because Java models programs using classes and objects and supports all major OOP concepts."
    },
    {
      question: "What are the advantages of OOP?",
      answer:
        "Code reuse, modularity, flexibility, maintainability, scalability, and easier testing."
    }
  ]
},

{
  id: "encapsulation",
  title: "Encapsulation",
  description:
    "Encapsulation is the process of binding data and methods together into a single unit (class) while hiding implementation details. It is achieved using private fields and public getter/setter methods.",

  faqs: [
    {
      question: "How is encapsulation achieved in Java?",
      answer:
        "By declaring instance variables private and providing public getter and setter methods."
    },
    {
      question: "Why is encapsulation important?",
      answer:
        "It protects data from unauthorized access, improves security, and makes code easier to maintain."
    },
    {
      question: "Is encapsulation related to data hiding?",
      answer:
        "Yes. Data hiding is one of the primary benefits achieved through encapsulation."
    }
  ]
},
{
  id: "inheritance",
  title: "Inheritance",
  difficulty: "Easy",
  description:
    "Inheritance is an OOP concept that allows one class to acquire the properties and methods of another class. The existing class is called the parent (superclass), and the new class is called the child (subclass). It promotes code reusability and establishes an 'is-a' relationship between classes. Java supports single, multilevel, and hierarchical inheritance through classes. Multiple inheritance is achieved using interfaces.",

  faqs: [
    {
      question: "What is inheritance?",
      answer:
        "Inheritance allows one class to inherit the properties and methods of another class, promoting code reuse."
    },
    {
      question: "Why doesn't Java support multiple inheritance with classes?",
      answer:
        "To avoid ambiguity and the Diamond Problem. Java supports multiple inheritance through interfaces."
    },
    {
      question: "What are the types of inheritance in Java?",
      answer:
        "Single, Multilevel, Hierarchical, and Multiple (using interfaces)."
    }
  ]
},

{
  id: "polymorphism",
  title: "Polymorphism",
  difficulty: "Medium",
  description:
    "Polymorphism means 'many forms'. It allows the same method or object to behave differently based on the context. Java supports Compile-time Polymorphism (Method Overloading) and Runtime Polymorphism (Method Overriding).",

  faqs: [
    {
      question: "What is polymorphism?",
      answer:
        "Polymorphism allows the same interface or method name to perform different tasks depending on the object."
    },
    {
      question: "What are the types of polymorphism?",
      answer:
        "Compile-time polymorphism (Method Overloading) and Runtime polymorphism (Method Overriding)."
    },
    {
      question: "How is runtime polymorphism achieved?",
      answer:
        "Through method overriding and dynamic method dispatch."
    }
  ]
},

{
  id: "abstraction",
  title: "Abstraction",
  difficulty: "Medium",
  description:
    "Abstraction is the process of hiding implementation details while showing only essential features to the user. In Java, abstraction is achieved using abstract classes and interfaces.",

  faqs: [
    {
      question: "What is abstraction?",
      answer:
        "Abstraction hides implementation details and exposes only the required functionality."
    },
    {
      question: "How can abstraction be achieved in Java?",
      answer:
        "Using abstract classes and interfaces."
    },
    {
      question: "Why is abstraction important?",
      answer:
        "It reduces complexity, improves maintainability, and provides better security."
    }
  ]
},

{
  id: "interfaces",
  title: "Interfaces",
  difficulty: "Medium",
  description:
    "An interface defines a contract that implementing classes must follow. It supports abstraction and multiple inheritance in Java. Since Java 8, interfaces can contain default and static methods, and since Java 9, private methods.",

  faqs: [
    {
      question: "What is an interface?",
      answer:
        "An interface is a blueprint containing abstract methods that implementing classes must define."
    },
    {
      question: "Difference between interface and abstract class?",
      answer:
        "Interfaces provide complete abstraction and support multiple inheritance, whereas abstract classes can have both abstract and concrete methods."
    },
    {
      question: "Can an interface have methods with implementation?",
      answer:
        "Yes. Java 8 introduced default and static methods, and Java 9 introduced private methods."
    }
  ]
},

{
  id: "method-overloading",
  title: "Method Overloading",
  difficulty: "Easy",
  description:
    "Method overloading means defining multiple methods with the same name but different parameter lists within the same class. It is an example of compile-time polymorphism.",

  faqs: [
    {
      question: "What is method overloading?",
      answer:
        "Having multiple methods with the same name but different parameter lists."
    },
    {
      question: "Can methods be overloaded by changing only the return type?",
      answer:
        "No. Return type alone cannot distinguish overloaded methods."
    },
    {
      question: "Is method overloading compile-time or runtime polymorphism?",
      answer:
        "Compile-time polymorphism."
    }
  ]
},

{
  id: "method-overriding",
  title: "Method Overriding",
  difficulty: "Medium",
  description:
    "Method overriding occurs when a child class provides its own implementation of a method already defined in its parent class. It enables runtime polymorphism.",

  faqs: [
    {
      question: "What is method overriding?",
      answer:
        "Redefining a superclass method in the child class with the same signature."
    },
    {
      question: "Can static methods be overridden?",
      answer:
        "No. Static methods are hidden, not overridden."
    },
    {
      question: "Can final methods be overridden?",
      answer:
        "No. Final methods cannot be overridden."
    }
  ]
},
  ]
},


  python: {
    name: 'Python',
    subtitle: 'High-Level Dynamic Scripting',
    paradigm: 'Object-Oriented / Procedural',
    typing: 'Strong / Dynamic',
    topics: [
      {
        id: 'py-basics',
        title: 'Lists, Tuples & Dicts',
        difficulty: 'Easy',
        description: 'Python features three essential built-in collections for data manipulation.',
        code: `# List (mutable)\nitems = ["apple", "banana"]\nitems.append("cherry")\n\n# Tuple (immutable)\ncoordinates = (34.05, -118.24)\n\n# Dictionary\nuser_info = {"username": "sde_prep", "xp": 450}`,
        faqs: [
          {
            question: 'What is the difference between a list and a tuple?',
            answer: 'Lists are mutable, tuples are immutable.'
          }
        ]
      }
      // Add more Python topics as needed
    ]
  },
  // Add the rest of your languages (java, cpp, c, html, sql) here with their full topics...
  // For brevity in this response, I'm showing the structure. Paste your full objects from the first message.
};

export default function CodingPracticePage() {
  const [selectedLangId, setSelectedLangId] = useState('react');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const selectedLang = tutorialsData[selectedLangId] || tutorialsData.react;
  const topics = selectedLang?.topics || [];
  const currentTopic = topics[selectedTopicIndex] || {
    title: 'No Content Available',
    description: 'Please select a different topic or language.',
    code: '',
    faqs: []
  };

  const handleCopy = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1800);
  };

  const handleNext = () => {
    if (selectedTopicIndex < topics.length - 1) {
      setSelectedTopicIndex(prev => prev + 1);
      setExpandedFaqIndex(null);
    }
  };

  const handlePrev = () => {
    if (selectedTopicIndex > 0) {
      setSelectedTopicIndex(prev => prev - 1);
      setExpandedFaqIndex(null);
    }
  };

  const toggleFaq = (idx) => {
    setExpandedFaqIndex(expandedFaqIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <div className="flex items-center gap-3 mb-2">
        <BookOpen className="w-8 h-8 text-[#d4684b]" />
        <h1 className="text-3xl font-bold text-white">Documentation & Interview Prep</h1>
      </div>
      <p className="text-slate-400 mb-8">High-quality tutorials with code examples and interview questions.</p>

      {/* Language Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
        {Object.keys(tutorialsData).map((key) => (
          <button
            key={key}
            onClick={() => {
              setSelectedLangId(key);
              setSelectedTopicIndex(0);
              setExpandedFaqIndex(null);
            }}
            className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all ${
              key === selectedLangId
                ? 'bg-gradient-to-r from-[#d4684b] to-[#e88d72] text-white shadow-lg'
                : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            {tutorialsData[key].name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="glass p-6 rounded-3xl sticky top-6">
            <h3 className="uppercase text-xs font-bold tracking-widest text-slate-400 mb-5">TOPICS</h3>
            <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
              {topics.length > 0 ? (
                topics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => { setSelectedTopicIndex(index); setExpandedFaqIndex(null); }}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm transition-all ${
                      index === selectedTopicIndex ? 'bg-white/10 border-l-4 border-[#d4684b] text-white' : 'hover:bg-white/5 text-slate-400'
                    }`}
                  >
                    <span className="line-clamp-2">{topic.title}</span>
                  </button>
                ))
              ) : (
                <p className="text-slate-500 py-8 text-center">No topics available</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-8">
          <motion.div
            key={`${selectedLangId}-${selectedTopicIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 md:p-10 rounded-3xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{currentTopic.title}</h2>
            <p className="text-slate-300 leading-relaxed mb-10">{currentTopic.description}</p>

            {currentTopic.code && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Code2 className="w-5 h-5" /> Code Example
                  </span>
                  <button onClick={() => handleCopy(currentTopic.code)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copiedCode ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <pre className="bg-[#0a0a0a] p-6 md:p-8 rounded-2xl overflow-x-auto text-sm font-mono text-slate-300 border border-white/10">
                  <code>{currentTopic.code}</code>
                </pre>
              </div>
            )}

            <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
              <button onClick={handlePrev} disabled={selectedTopicIndex === 0} className="flex items-center gap-2 disabled:opacity-40 text-slate-400 hover:text-white">
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button onClick={handleNext} disabled={selectedTopicIndex === topics.length - 1} className="flex items-center gap-2 disabled:opacity-40 text-slate-400 hover:text-white">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Interview Questions */}
          {currentTopic.faqs && currentTopic.faqs.length > 0 && (
            <div className="glass p-8 md:p-10 rounded-3xl">
              <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
                <Lightbulb className="text-amber-400 w-6 h-6" /> Interview Questions
              </h3>
              <div className="space-y-4">
                {currentTopic.faqs.map((faq, idx) => {
                  const isExpanded = expandedFaqIndex === idx;
                  return (
                    <div key={idx} className="border border-white/10 rounded-2xl bg-white/[0.015]">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/5"
                      >
                        <span className="text-slate-200">{faq.question}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="px-6 pb-6 text-slate-400 border-t border-white/10 pt-4">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}