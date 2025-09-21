'use client';

import { useState, useEffect } from 'react';

interface WorkflowNode {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  duration: number;
  status: 'pending' | 'running' | 'completed';
}

interface WorkflowSimulationProps {
  productName: string;
}

export default function WorkflowSimulation({ productName }: WorkflowSimulationProps) {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const nodes: WorkflowNode[] = [
    {
      id: 'start',
      title: 'Start',
      description: 'Workflow initiated',
      icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
      color: 'bg-gray-500',
      duration: 1000,
      status: 'pending'
    },
    {
      id: 'image-ai',
      title: 'Image AI',
      description: 'Generating images',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: 'bg-purple-500',
      duration: 3000,
      status: 'pending'
    },
    {
      id: 'social-media',
      title: 'Social Posts',
      description: 'Creating content',
      icon: 'M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 16h14l-2-16M11 9h2m-2 4h2',
      color: 'bg-blue-500',
      duration: 2500,
      status: 'pending'
    },
    {
      id: 'video-ads',
      title: 'Video Ads',
      description: 'Generating videos',
      icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
      color: 'bg-green-500',
      duration: 3500,
      status: 'pending'
    },
    {
      id: 'complete',
      title: 'Complete',
      description: 'Product published',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'bg-green-600',
      duration: 1000,
      status: 'pending'
    }
  ];

  const [workflowNodes, setWorkflowNodes] = useState(nodes);

  useEffect(() => {
    const runWorkflow = async () => {
      for (let i = 0; i < nodes.length; i++) {
        setCurrentNodeIndex(i);
        
        setWorkflowNodes(prev => 
          prev.map((node, index) => ({
            ...node,
            status: index < i ? 'completed' : index === i ? 'running' : 'pending'
          }))
        );

        const duration = nodes[i].duration;
        const steps = 50;
        const stepDuration = duration / steps;
        
        for (let step = 0; step <= steps; step++) {
          setProgress((step / steps) * 100);
          await new Promise(resolve => setTimeout(resolve, stepDuration));
        }

        setWorkflowNodes(prev => 
          prev.map((node, index) => ({
            ...node,
            status: index <= i ? 'completed' : 'pending'
          }))
        );
        
        setProgress(0);
      }
    };

    runWorkflow();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Workflow Processing</h2>
          <p className="text-gray-600">Enhancing "{productName}" with AI automation</p>
        </div>

        <div className="relative">
          <div className="bg-gray-50 rounded-2xl p-8 min-h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="border border-gray-300"></div>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                {workflowNodes.map((node, index) => (
                  <div key={node.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`relative w-16 h-16 rounded-xl ${node.color} flex items-center justify-center shadow-lg transition-all duration-500 ${
                        node.status === 'running' ? 'animate-pulse scale-110' :
                        node.status === 'completed' ? 'scale-100' :
                        'scale-90 opacity-50'
                      }`}>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={node.icon}></path>
                        </svg>
                        
                        {node.status === 'running' && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                        )}
                        
                        {node.status === 'completed' && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3 text-center">
                        <p className="text-sm font-semibold text-gray-900">{node.title}</p>
                        <p className="text-xs text-gray-600 max-w-20">{node.description}</p>
                      </div>
                      
                      {node.status === 'running' && (
                        <div className="mt-2 w-20">
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div 
                              className={`h-1 rounded-full ${node.color} transition-all duration-300`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 text-center mt-1">{Math.round(progress)}%</p>
                        </div>
                      )}
                    </div>

                    {index < workflowNodes.length - 1 && (
                      <div className="flex items-center mx-4">
                        <div className={`h-0.5 w-12 transition-all duration-500 ${
                          workflowNodes[index + 1].status !== 'pending' ? 'bg-green-400' : 'bg-gray-300'
                        }`}></div>
                        <div className={`w-0 h-0 border-l-4 border-r-0 border-t-2 border-b-2 border-transparent transition-all duration-500 ${
                          workflowNodes[index + 1].status !== 'pending' ? 'border-l-green-400' : 'border-l-gray-300'
                        }`}></div>
                        
                        {workflowNodes[index + 1].status === 'running' && (
                          <div className="absolute w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center justify-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${workflowNodes[currentNodeIndex]?.color} animate-pulse`}></div>
                  <p className="text-sm font-medium text-gray-900">
                    {workflowNodes[currentNodeIndex]?.status === 'running' ? 'Processing: ' : 'Completed: '}
                    {workflowNodes[currentNodeIndex]?.title}
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-1">{workflowNodes[currentNodeIndex]?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}