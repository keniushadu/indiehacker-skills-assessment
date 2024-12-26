export type Locale = 'zh' | 'en'

export const translations = {
  zh: {
    categories: {
      "商业洞察": "商业洞察",
      "产品设计": "产品设计",
      "编码开发": "编码开发",
      "运营营销": "运营营销",
      "增长变现": "增长变现",
      "自我管理": "自我管理"
    },
    questions: {
      "商业洞察": [
        "我能快速识别市场上的潜在机会和未被满足的需求。",
        "我能准确分析竞争对手的优势和劣势。",
        "我能清楚地定义产品的市场定位和核心价值。",
      ],
      "产品设计": [
        "我能够设计出符合用户需求的产品功能。",
        "我擅长通过 MVP 快速测试想法。",
        "我能根据用户反馈快速迭代产品设计。",
      ],
      "编码开发": [
        "我熟悉前端、后端或移动端开发的核心技术。",
        "我擅长调试和解决代码中的复杂问题。",
        "我能够根据需求快速学习新技术或框架。",
      ],
      "运营营销": [
        "我能制定有效的内容营销计划（如博客、社交媒体）。",
        "我擅长通过SEO增加产品曝光度。",
        "我熟悉社群运营和用户互动的基本技巧。"
      ],
      "增长变现": [
        "我能设计多种盈利模式（如订阅、广告）。",
        "我能够设置合理的价格策略以吸引用户购买。",
        "我能通过产品设计增加用户的留存率。",
      ],
      "自我管理": [
        "我有高效的时间规划能力。",
        "我能持续学习并保持专注。",
        "我能有效地管理压力和情绪。",
        "我能在独立工作时保持高效率和自律。",
      ]
    },
    answers: [
      {
        value: 5,
        label: "非常熟练，可以教导他人"
      },
      {
        value: 4,
        label: "掌握得不错，能独立处理"
      },
      {
        value: 3,
        label: "基本了解，需要时可以学习"
      },
      {
        value: 2,
        label: "了解一些，但不太熟悉"
      },
      {
        value: 1,
        label: "完全不了解"
      }
    ],
    suggestions: {
      "商业洞察": {
        category: "商业洞察",
        suggestions: [
          "定期阅读行业报告和市场分析",
          "参与创业社区和论坛讨论",
          "建立用户访谈和反馈机制",
          "学习竞品分析方法"
        ],
        resources: [
          {
            title: "独立开发者周刊",
            description: "了解最新的独立开发趋势和机会"
          },
          {
            title: "Product Hunt",
            description: "发现新产品和市场需求"
          }
        ]
      },
      "产品设计": {
        category: "产品设计",
        suggestions: [
          "学习用户体验设计基础",
          "练习快速原型设计",
          "建立用户测试流程",
          "关注优秀产品的设计细节"
        ],
        resources: [
          {
            title: "设计师导航",
            description: "优秀的设计资源和工具集合"
          },
          {
            title: "Figma 社区",
            description: "学习和借鉴优秀的设计案例"
          }
        ]
      },
      "编码开发": {
        category: "编码开发",
        suggestions: [
          "制定系统的学习计划",
          "参与开源项目",
          "订阅技术博客和周刊",
          "多动手实践，建立个人项目"
        ],
        resources: [
          {
            title: "GitHub Trending",
            description: "发现热门开源项目和学习机会"
          }
        ]
      },
      "运营营销": {
        category: "运营营销",
        suggestions: [
          "学习内容营销策略",
          "实践社群运营技巧",
          "掌握基础的SEO优化",
          "尝试不同的获客渠道"
        ],
        resources: [
          {
            title: "增长黑客指南",
            description: "学习产品增长和营销策略"
          },
          {
            title: "SEO优化指南",
            description: "掌握搜索引擎优化基础"
          }
        ]
      },
      "增长变现": {
        category: "增长变现",
        suggestions: [
          "研究不同的商业模式",
          "学习定价策略",
          "建立数据分析体系",
          "优化用户转化流程"
        ],
        resources: [
          {
            title: "独立开发者变现指南",
            description: "学习产品变现和商业化策略"
          },
          {
            title: "数据分析入门",
            description: "掌握基础的数据分析方法"
          }
        ]
      },
      "自我管理": {
        category: "自我管理",
        suggestions: [
          "建立时间管理系统",
          "培养持续学习的习惯",
          "保持工作生活平衡",
          "设定明确的目标计划"
        ],
        resources: [
          {
            title: "效率工具指南",
            description: "提升个人和团队效率的工具推荐"
          },
          {
            title: "远程工作指南",
            description: "学习自我管理和远程协作技巧"
          }
        ]
      }
    },
    ui: {
      title: "您的 Indie Hacker 技能六边形",
      subtitle: "下面展示了您在各个领域的技能水平评估结果",
      skillImprovement: "技能提升建议",
      improvementSuggestions: "提升建议",
      tryThis: "可以尝试：",
      recommendedResources: "推荐资源：",
      congratulations: "恭喜！你在各个领域都表现不错",
      keepImproving: "继续保持，不断提升和完善各项技能。建议可以尝试：",
      expertTip: "深入研究某个特定领域，成为专家",
      combineTip: "尝试将不同领域的技能结合，创造独特价值",
      shareTip: "分享你的经验，帮助其他开发者成长",
      restart: "重新开始评估",
      homeTitle: "Indie Hacker 技能评估",
      homeSubtitle: "通过这个评估工具，了解你在独立开发各个领域的技能水平，发现潜在的提升空间。",
      startAssessment: "开始评估",
      assessmentDesc: "请根据以下陈述，选择最符合您情况的选项：",
      timeEstimate: "预计用时：3-5 分钟"
    }
  },
  en: {
    categories: {
      "商业洞察": "Business Insight",
      "产品设计": "Product Design",
      "编码开发": "Development",
      "运营营销": "Marketing",
      "增长变现": "Growth & Monetization",
      "自我管理": "Self Management"
    },
    questions: {
      "商业洞察": [
        "I can quickly identify market opportunities and unmet needs.",
        "I can accurately analyze competitors' strengths and weaknesses.",
        "I can clearly define product positioning and core value.",
      ],
      "产品设计": [
        "I can design product features that meet user needs.",
        "I'm good at testing ideas quickly through MVP.",
        "I can iterate product design quickly based on user feedback.",
      ],
      "编码开发": [
        "I'm familiar with core technologies in frontend, backend, or mobile development.",
        "I'm good at debugging and solving complex code problems.",
        "I can quickly learn new technologies or frameworks as needed.",
      ],
      "运营营销": [
        "I can create effective content marketing plans (e.g., blogs, social media).",
        "I'm good at increasing product exposure through SEO.",
        "I'm familiar with community operations and user interaction basics.",
      ],
      "增长变现": [
        "I can design various monetization models (e.g., subscription, ads).",
        "I can set reasonable pricing strategies to attract users.",
        "I can increase user retention through product design.",
      ],
      "自我管理": [
        "I have efficient time management skills.",
        "I can maintain focus and continuous learning.",
        "I can effectively manage stress and emotions.",
        "I can maintain efficiency and self-discipline when working independently.",
      ]
    },
    answers: [
      {
        value: 5,
        label: "Very proficient, can teach others"
      },
      {
        value: 4,
        label: "Good grasp, can handle independently"
      },
      {
        value: 3,
        label: "Basic understanding, can learn when needed"
      },
      {
        value: 2,
        label: "Some knowledge, but not familiar"
      },
      {
        value: 1,
        label: "No understanding at all"
      }
    ],
    suggestions: {
      "商业洞察": {
        category: "Business Insight",
        suggestions: [
          "Regularly read industry reports and market analysis",
          "Participate in startup communities and forum discussions",
          "Establish user interview and feedback mechanisms",
          "Learn competitor analysis methods"
        ],
        resources: [
          {
            title: "Indie Hackers Weekly",
            description: "Stay updated with indie development trends and opportunities"
          },
          {
            title: "Product Hunt",
            description: "Discover new products and market needs"
          }
        ]
      },
      "产品设计": {
        category: "Product Design",
        suggestions: [
          "Learn UX design fundamentals",
          "Practice rapid prototyping",
          "Establish user testing processes",
          "Study design details of excellent products"
        ],
        resources: [
          {
            title: "Designer News",
            description: "Collection of excellent design resources and tools"
          },
          {
            title: "Figma Community",
            description: "Learn from outstanding design cases"
          }
        ]
      },
      "编码开发": {
        category: "Development",
        suggestions: [
          "Create a systematic learning plan",
          "Contribute to open source projects",
          "Subscribe to tech blogs and newsletters",
          "Build personal projects for hands-on practice"
        ],
        resources: [
          {
            title: "GitHub Trending",
            description: "Discover trending open source projects and learning opportunities"
          }
        ]
      },
      "运营营销": {
        category: "Marketing",
        suggestions: [
          "Learn content marketing strategies",
          "Practice community management",
          "Master basic SEO optimization",
          "Try different user acquisition channels"
        ],
        resources: [
          {
            title: "Growth Hacking Guide",
            description: "Learn product growth and marketing strategies"
          },
          {
            title: "SEO Guide",
            description: "Master search engine optimization basics"
          }
        ]
      },
      "增长变现": {
        category: "Growth & Monetization",
        suggestions: [
          "Research different business models",
          "Learn pricing strategies",
          "Build data analysis systems",
          "Optimize user conversion processes"
        ],
        resources: [
          {
            title: "Indie Monetization Guide",
            description: "Learn product monetization and commercialization strategies"
          },
          {
            title: "Data Analytics Basics",
            description: "Master fundamental data analysis methods"
          }
        ]
      },
      "自我管理": {
        category: "Self Management",
        suggestions: [
          "Establish time management systems",
          "Cultivate continuous learning habits",
          "Maintain work-life balance",
          "Set clear goals and plans"
        ],
        resources: [
          {
            title: "Productivity Tools Guide",
            description: "Tool recommendations for improving personal and team efficiency"
          },
          {
            title: "Remote Work Guide",
            description: "Learn self-management and remote collaboration skills"
          }
        ]
      }
    },
    ui: {
      title: "Your Indie Hacker Skills Hexagon",
      subtitle: "Below shows your skill level assessment results in various areas",
      skillImprovement: "Skill Improvement Suggestions",
      improvementSuggestions: "Improvement Suggestions",
      tryThis: "Try this:",
      recommendedResources: "Recommended Resources:",
      congratulations: "Congratulations! You're doing well in all areas",
      keepImproving: "Keep it up and continue to improve your skills. Consider trying:",
      expertTip: "Deep dive into a specific area to become an expert",
      combineTip: "Try combining skills from different areas to create unique value",
      shareTip: "Share your experience to help other developers grow",
      restart: "Start New Assessment",
      homeTitle: "Indie Hacker Skills Assessment",
      homeSubtitle: "Through this assessment tool, you can understand your skill level in different areas and find potential areas for improvement.",
      startAssessment: "Start Assessment",
      assessmentDesc: "Please answer the following statements to the best of your ability:",
      timeEstimate: "Estimated time: 3-5 minutes"
    }
  }
}
