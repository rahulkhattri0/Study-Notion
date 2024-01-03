import React, { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import FormRow from '../../common/FormRow';
const TagInput = ({ register, setValue, errors }) => {
  const { course, editCourse } = useSelector((store) => store.course);
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const tagValue = event.target.value.trim();
      if (tagValue.length > 0 && !tags.some((tag) => tag.value === tagValue)) {
        console.log(tags);
        const newTags = [...tags, { id: tags.length + 1, value: tagValue }];
        setTags(newTags);
        event.target.value = '';
      }
    }
  }
  const [tags, setTags] = useState(!course.tags ? [] : course.tags);
  useEffect(() => {
    register('tags', { validate: (value) => value.length > 0 });
  }, []);
  useEffect(() => {
    setValue('tags', tags);
  }, [tags]);
  useEffect(() => {
    if (!editCourse) {
      setTags([]);
    }
  }, [editCourse]);
  return (
    <FormRow labelText={'Tags'}>
      {/* tags */}
      {tags.length > 0 && (
        <div className="flex flex-row gap-x-2 flex-wrap">
          {tags.map((tag) => {
            return (
              <div
                key={tag.id}
                className="rounded-full px-2 py-1 bg-yellow-50 text-pure-greys-25 bg-opacity-50 m-1 flex flex-row gap-x-1 items-center"
              >
                <p>{tag.value}</p>
                <IoIosClose
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    const newTags = tags.filter((element) => element.value !== tag.value);
                    setTags(newTags);
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
      <input
        className="form-style"
        placeholder="Enter tags..."
        type="text"
        onKeyDown={handleKeyDown}
      />
      {errors.tags && <p className="warning-style">Please give tags</p>}
    </FormRow>
  );
};

export default TagInput;
