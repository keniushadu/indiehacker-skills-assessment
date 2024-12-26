import QuestionnaireForm from '../components/QuestionnaireForm'

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 mb-4">
          Indie Hacker 技能评估
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          通过这个评估工具，了解你在独立开发各个领域的技能水平，发现潜在的提升空间。
        </p>
      </div>
      
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8">
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
          请根据以下陈述，选择最符合您情况的选项：
        </p>
        <QuestionnaireForm />
      </div>
    </div>
  )
}
