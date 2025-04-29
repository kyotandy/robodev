"use client"

import React from 'react'

export default function ArticleContent() {
  // This would typically be rendered from markdown in a real application
  return (
    <div>
      <h2>Introduction</h2>
      <p>
        Robotic arms are among the most versatile and widely-used robotic systems in industry and research. 
        In this article, we'll walk through the complete process of designing and implementing a 6-DOF (Degrees of Freedom) 
        robotic arm controlled by ROS2 (Robot Operating System 2). This project combines mechanical design, electronics, 
        firmware, and software into one comprehensive system.
      </p>
      
      <h2>Mechanical Design Considerations</h2>
      <p>
        The first step in creating our robotic arm is designing the mechanical structure. 
        We'll be using a 6-DOF configuration to provide maximum flexibility and movement range. 
        The arm will consist of the following joints:
      </p>
      
      <ul>
        <li>Base rotation (Shoulder Yaw)</li>
        <li>Shoulder pitch</li>
        <li>Elbow pitch</li>
        <li>Wrist roll</li>
        <li>Wrist pitch</li>
        <li>Wrist yaw (End effector)</li>
      </ul>
      
      <p>
        When designing the mechanical components, we need to consider several factors:
      </p>
      
      <ol>
        <li>
          <strong>Load requirements:</strong> The arm must support a maximum payload of 500g at full extension.
        </li>
        <li>
          <strong>Material selection:</strong> We'll use aluminum for the main structural components to balance weight and strength.
        </li>
        <li>
          <strong>Motor sizing:</strong> Each joint requires appropriately sized servo motors based on torque calculations.
        </li>
        <li>
          <strong>Gear reduction:</strong> Where necessary, we'll implement gear reduction to increase torque capacity.
        </li>
      </ol>
      
      <h2>CAD Design</h2>
      <p>
        Using Fusion 360, we've created a comprehensive 3D model of our robotic arm. 
        The model includes all structural components, motor mounts, and assembly interfaces. 
        You can explore the full 3D model in the viewer below.
      </p>
      
      <p>
        Key considerations in our CAD design include:
      </p>
      
      <ul>
        <li>Minimizing weight while maintaining structural integrity</li>
        <li>Designing cable routing paths through the arm</li>
        <li>Creating modular components for easier assembly and maintenance</li>
        <li>Ensuring appropriate clearances for full range of motion</li>
      </ul>
      
      <h2>Electronics and Control System</h2>
      <p>
        For controlling the arm, we'll implement a distributed control system with:
      </p>
      
      <ul>
        <li>Raspberry Pi 4 as the main controller running ROS2</li>
        <li>Custom motor controller boards for each joint</li>
        <li>Absolute encoders for precise position feedback</li>
        <li>CAN bus communication between the main controller and motor drivers</li>
      </ul>
      
      <h3>Motor Selection</h3>
      <p>
        Based on our torque calculations, we've selected the following motors:
      </p>
      
      <ul>
        <li>Base rotation: NEMA 17 stepper motor with 1:5 gear reduction</li>
        <li>Shoulder pitch: High-torque servo motor (35kg-cm)</li>
        <li>Elbow pitch: High-torque servo motor (20kg-cm)</li>
        <li>Wrist joints: Mini servo motors (8kg-cm)</li>
      </ul>
      
      <h2>ROS2 Implementation</h2>
      <p>
        For software control, we'll leverage ROS2's powerful features to create a robust control system. 
        Our ROS2 implementation includes:
      </p>
      
      <pre><code>
// Example ROS2 node for arm control
#include "rclcpp/rclcpp.hpp"
#include "sensor_msgs/msg/joint_state.hpp"
#include "trajectory_msgs/msg/joint_trajectory.hpp"

class ArmController : public rclcpp::Node
{
public:
  ArmController() : Node("arm_controller")
  {
    // Publishers and subscribers
    joint_state_pub_ = this->create_publisher<sensor_msgs::msg::JointState>(
      "joint_states", 10);
    
    trajectory_sub_ = this->create_subscription<trajectory_msgs::msg::JointTrajectory>(
      "arm_trajectory", 10, 
      std::bind(&ArmController::trajectoryCallback, this, std::placeholders::_1));
    
    // Timer for publishing joint states
    timer_ = this->create_wall_timer(
      std::chrono::milliseconds(10), 
      std::bind(&ArmController::timerCallback, this));
  }

private:
  void trajectoryCallback(const trajectory_msgs::msg::JointTrajectory::SharedPtr msg)
  {
    // Process incoming trajectory commands
  }
  
  void timerCallback()
  {
    // Publish current joint states
    auto message = sensor_msgs::msg::JointState();
    // Populate message
    joint_state_pub_->publish(message);
  }
  
  rclcpp::Publisher<sensor_msgs::msg::JointState>::SharedPtr joint_state_pub_;
  rclcpp::Subscription<trajectory_msgs::msg::JointTrajectory>::SharedPtr trajectory_sub_;
  rclcpp::TimerBase::SharedPtr timer_;
};

int main(int argc, char* argv[])
{
  rclcpp::init(argc, argv);
  auto node = std::make_shared<ArmController>();
  rclcpp::spin(node);
  rclcpp::shutdown();
  return 0;
}
      </code></pre>
      
      <h2>Kinematics and Motion Planning</h2>
      <p>
        To control the arm effectively, we need to implement forward and inverse kinematics. 
        For our 6-DOF arm, the Denavit-Hartenberg parameters are:
      </p>
      
      <pre><code>
// DH Parameters
// Joint | a | alpha | d | theta
// 1     | 0 | pi/2  | 0 | q1
// 2     | L1| 0     | 0 | q2
// 3     | L2| 0     | 0 | q3
// 4     | 0 | pi/2  | 0 | q4
// 5     | 0 | pi/2  | L3| q5
// 6     | 0 | 0     | 0 | q6
      </code></pre>
      
      <p>
        For motion planning, we'll integrate with MoveIt2, which provides powerful planning capabilities 
        including collision avoidance, path planning, and inverse kinematics solvers.
      </p>
      
      <h2>Conclusion</h2>
      <p>
        This article has covered the key aspects of designing and implementing a 6-DOF robotic arm with ROS2. 
        By combining principles from mechanical engineering, electronics, and software development, 
        we've created a versatile and capable robotic system. The complete CAD model, code, and 
        configuration files are available in the GitHub repository linked below.
      </p>
      
      <p>
        In future articles, we'll explore advanced topics such as implementing computer vision for 
        object recognition and pick-and-place operations, as well as integrating force feedback for compliant control.
      </p>
    </div>
  )
}