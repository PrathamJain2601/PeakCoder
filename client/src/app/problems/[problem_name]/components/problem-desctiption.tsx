import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function ProblemDescription() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section)
  }

  return (
    <div className="h-full overflow-y-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Two Sum</h1>
      <div className="prose prose-invert">
        <p>
          Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two
          numbers such that they add up to <code>target</code>.
        </p>
        <p>
          You may assume that each input would have exactly one solution, and you may not use the same element twice.
        </p>
        <p>You can return the answer in any order.</p>
        <h2 className="text-xl font-semibold mt-4 mb-2">Example 1:</h2>
        <div className="bg-gray-800 p-2 rounded">
          <p>
            Input: nums = [2,7,11,15], target = 9
          </p>
          <p>
            Output: [0,1]
          </p>
          <p>
            Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
          </p>
        </div>  
        <h2 className="text-xl font-semibold mt-4 mb-2">Constraints:</h2>
        <ul className="list-disc list-inside">
          <li>2 ≤ nums.length ≤ 10^4</li>
          <li>-10^9 ≤ nums[i] ≤ 10^9</li>
          <li>-10^9 ≤ target ≤ 10^9</li>
          <li>Only one valid answer exists.</li>
        </ul>
      </div>
      <div className="mt-6">
        <Accordion
          title="Topics"
          content={["Array", "Hash Table"]}
          isOpen={activeAccordion === "topics"}
          onClick={() => toggleAccordion("topics")}
        />
        <Accordion
          title="Hints"
          content={[
            "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
            "Try to use the fact that the complement of a number can be found in constant time using a hash table.",
          ]}
          isOpen={activeAccordion === "hints"}
          onClick={() => toggleAccordion("hints")}
        />
      </div>
    </div>
  )
}

function Accordion({
  title,
  content,
  isOpen,
  onClick,
}: {
  title: string
  content: string[]
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <div className="mb-4">
      <button className="flex items-center justify-between w-full p-2 bg-gray-800 rounded" onClick={onClick}>
        <span>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="mt-2 p-2 bg-gray-800 rounded">
          <ol className="list-decimal list-inside">
            {content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

