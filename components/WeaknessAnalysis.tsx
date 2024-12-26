'use client'

import React from 'react';

interface Suggestion {
  category: string;
  suggestions: string[];
  resources: { title: string; description: string }[];
}

const suggestions: Record<string, Suggestion> = {
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
};

interface WeaknessAnalysisProps {
  scores: Record<string, number>;
  threshold?: number;
}

export default function WeaknessAnalysis({ scores, threshold = 3.0 }: WeaknessAnalysisProps) {
  const weakAreas = Object.entries(scores)
    .filter(([_, score]) => score < threshold)
    .map(([category]) => suggestions[category]);

  if (weakAreas.length === 0) {
    return (
      <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/10 rounded-2xl">
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">
          恭喜！你在各个领域都表现不错
        </h3>
        <p className="text-green-600 dark:text-green-400">
          继续保持，不断提升和完善各项技能。建议可以尝试：
        </p>
        <ul className="mt-4 space-y-2 text-green-600 dark:text-green-400">
          <li>• 深入研究某个特定领域，成为专家</li>
          <li>• 尝试将不同领域的技能结合，创造独特价值</li>
          <li>• 分享你的经验，帮助其他开发者成长</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        技能提升建议
      </h3>
      {weakAreas.map((area) => (
        <div
          key={area.category}
          className="p-6 bg-purple-50 dark:bg-purple-900/10 rounded-2xl"
        >
          <h4 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-4">
            {area.category} 提升建议
          </h4>
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-purple-600 dark:text-purple-400 mb-2">
                可以尝试：
              </h5>
              <ul className="space-y-2">
                {area.suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="text-purple-600 dark:text-purple-400"
                  >
                    • {suggestion}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-purple-600 dark:text-purple-400 mb-2">
                推荐资源：
              </h5>
              <ul className="space-y-3">
                {area.resources.map((resource, index) => (
                  <li
                    key={index}
                    className="text-purple-600 dark:text-purple-400"
                  >
                    <div className="font-medium">{resource.title}</div>
                    <div className="text-sm text-purple-500 dark:text-purple-500">
                      {resource.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
