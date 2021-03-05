import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import {
  createDish,
  createDishVariables,
} from "../../__generated__/createDish";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      error
      ok
    }
  }
`;

interface IParams {
  id: string;
}

interface IForm {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}

export const AddMenu = () => {
  //useHistory
  const history = useHistory();
  //useParams
  const { id: restaurantId } = useParams<IParams>();
  //useMutation
  const [createDishMutation, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: {
            id: +restaurantId,
          },
        },
      },
    ],
  });
  //useForm
  //modeがonChangeじゃないとformStateも使えない。
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    getValues,
  } = useForm<IForm>({
    mode: "onChange",
  });
  //onSubmit
  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues();
    console.log(rest);
    const objectOptions = optionsNumber.map((optionsId) => ({
      name: rest[`${optionsId}-optionName`],
      extra: +rest[`${optionsId}-optionExtra`],
    }));
    console.log(objectOptions);
    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaunrantId: parseInt(restaurantId),
          options: objectOptions,
        },
      },
    });
    history.goBack();
  };
  //useState option追加の総数を確認
  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
  //optionボタンをクリックした時
  const onCreateOptionClick = () => {
    setOptionsNumber((current) => [Date.now(), ...current]);
  };
  //option内の削除ボタンをクリックした時
  const onDeleteClick = (optionId: number) => {
    setOptionsNumber((current) =>
      current.filter((currentId) => currentId !== optionId)
    );
    //typescript バグった時抜ける方法　 ->//@ts-ignore
    setValue(`${optionId}-optionName`, "");
    setValue(`${optionId}-optionExtra`, "");
  };
  return (
    <div className="commonContainer w-full max-w-screen-sm flex flex-col items-center px-5">
      <Helmet>
        <title>メニュー追加 | Higawari Eats </title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">メニュー追加</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-4"
      >
        <input
          className="inputCss"
          type="text"
          name="name"
          placeholder="メニュー名"
          ref={register({ required: "商名を入力してください。" })}
        />
        <input
          className="inputCss"
          type="number"
          name="price"
          min={0} // マイナスpriceはだめ
          placeholder="価格"
          ref={register({ required: "価格を入力してください。" })}
        />
        <input
          className="inputCss"
          type="text"
          name="description"
          placeholder="詳細"
          ref={register({ required: "詳細を入力してください。" })}
        />
        <div className="my-10">
          <h4 className="font-medium  mb-3 text-lg">メニューのオプション</h4>
          <span
            onClick={onCreateOptionClick}
            className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5"
          >
            オプション追加
          </span>
          {optionsNumber.length !== 0 &&
            optionsNumber.map((id) => (
              <div key={id} className="mt-5">
                {/* ref={register}を登録しておくとuseFormが追跡する。 */}
                <input
                  ref={register}
                  name={`${id}-optionName`}
                  className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                  type="text"
                  placeholder="オプション名"
                />
                <input
                  ref={register}
                  name={`${id}-optionExtra`}
                  className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2"
                  type="number"
                  min={0} // マイナスpriceはだめ
                  placeholder="価格"
                />
                {/* form中ではbuttonタグ使用不可 */}
                <span
                  className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 border-gray-700 border-2"
                  //onClick={onDeleteClick(id)} <- onDelete関数が即時実行されるので下みたいに変える
                  onClick={() => onDeleteClick(id)}
                >
                  削除
                </span>
              </div>
            ))}
        </div>
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="生成"
        />
      </form>
    </div>
  );
};
