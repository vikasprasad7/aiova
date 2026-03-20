from typing import TypedDict, Optional
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from database import client


class AgentState(TypedDict):
    input_text: str
    doctor_name: Optional[str]
    # ... baki fields ...

llm = ChatOpenAI(model="gpt-4o")



def extract_info(state: AgentState):
    # LLM prompt to extract info and return structured JSON
    return llm.with_structured_output(AgentState).invoke([HumanMessage(content=state['input_text'])])

workflow = StateGraph(AgentState)
workflow.add_node("extractor", extract_info)
workflow.set_entry_point("extractor")
workflow.add_edge("extractor", END)
graph = workflow.compile()
